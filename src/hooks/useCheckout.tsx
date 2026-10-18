// src/hooks/useCheckout.ts
import { useContext, useState, type SyntheticEvent } from "react";
import { CartContext } from "../context/CartContext";
import type { Buyer, Order } from "../types/order";
import { useDeductStock } from "./useDeductStock";
import { useCreateOrder } from "./useOrders";

export const useCheckout = () => {
    const { cart, clearCart } = useContext(CartContext)!;
    const [buyer, setBuyer] = useState<Buyer>({
        name: "",
        email: "",
        phone: "",
    });
    const [orderId, setOrderId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const deductStockMutation = useDeductStock();
    const createOrderMutation = useCreateOrder();

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (cart.length === 0) return;
        setErrorMessage(null);

        const calculatedTotal = cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        );

        const itemsToDeduct = cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
        }));

        try {
            await deductStockMutation.mutateAsync(itemsToDeduct);

            const generatedId = Math.random()
                .toString(36)
                .substring(2, 9)
                .toUpperCase();

            const newOrder: Order = {
                id: generatedId,
                buyer,
                items: cart.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                })),
                total: calculatedTotal,
                date: new Date().toISOString(),
            };

            await createOrderMutation.mutateAsync(newOrder);

            setOrderId(generatedId);
            clearCart();
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage(
                    "Ocurrió un error inesperado al procesar la compra.",
                );
            }
        }
    };

    const clearError = () => setErrorMessage(null);

    return {
        buyer,
        setBuyer,
        orderId,
        errorMessage,
        clearError,
        isSubmitting:
            deductStockMutation.isPending || createOrderMutation.isPending,
        handleSubmit,
        cart,
    };
};
