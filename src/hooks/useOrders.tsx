import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "../services/ordersService";
import type { Order } from "../types/order";

export const useOrders = () => {
    return useQuery<Order[], Error>({
        queryKey: ["orders"],
        queryFn: ordersService.getAll,
    });
};

export const useOrder = (id?: string) => {
    return useQuery<Order, Error>({
        queryKey: ["order", id],
        queryFn: () => ordersService.getById(id!),
        enabled: Boolean(id),
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ordersService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
};
