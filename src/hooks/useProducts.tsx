import { useQuery } from "@tanstack/react-query";
import { productsService } from "../services/productsService";
import type { Product } from "../types/product";

export const useProducts = (categoryId?: string) => {
    return useQuery<Product[], Error>({
        queryKey: categoryId
            ? ["products", "category", categoryId]
            : ["products"],
        queryFn: () =>
            categoryId
                ? productsService.getByCategory(categoryId)
                : productsService.getAll(),
        staleTime: 1000 * 60 * 5,
    });
};
