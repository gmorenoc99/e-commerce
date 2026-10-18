import type { Product } from "../types/product";
import type { StockDeductionItem } from "../types/stockDeductionItem";
import { api } from "./api";

export const productsService = {
    getAll: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>("/products");
        return response.data;
    },

    getByCategory: async (category: string): Promise<Product[]> => {
        const response = await api.get<Product[]>(
            `/products?categoryId=${category}`,
        );
        return response.data;
    },

    getById: async (id: string): Promise<Product> => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    deductStockBatch: async (items: StockDeductionItem[]): Promise<void> => {
        // FASE 1: Obtener estado actual en tiempo real de cada producto y validar stock
        const productsWithRequestedQty = await Promise.all(
            items.map(async (item) => {
                const currentProduct = await productsService.getById(item.id);
                return {
                    product: currentProduct,
                    requestedQty: item.quantity,
                };
            }),
        );

        // Verificar que TODOS los productos tengan suficiente stock
        const insufficientItems = productsWithRequestedQty.filter(
            ({ product, requestedQty }) => product.stock < requestedQty,
        );

        if (insufficientItems.length > 0) {
            const names = insufficientItems
                .map(({ product }) => `"${product.title}"`)
                .join(", ");
            throw new Error(
                `No hay suficiente stock para completar la compra de: ${names}.`,
            );
        }

        // FASE 2: Si todos pasaron la validación, procedemos a descontar stock
        await Promise.all(
            productsWithRequestedQty.map(({ product, requestedQty }) => {
                const newStock = product.stock - requestedQty;
                return api.patch<Product>(`/products/${product.id}`, {
                    stock: newStock,
                });
            }),
        );
    },
};
