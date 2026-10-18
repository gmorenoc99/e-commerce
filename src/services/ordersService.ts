import type { Order } from "../types/order";
import { api } from "./api";

export const ordersService = {
    create: async (order: Order): Promise<Order> => {
        const response = await api.post<Order>("/orders", order);
        return response.data;
    },

    getAll: async (): Promise<Order[]> => {
        const response = await api.get<Order[]>("/orders");
        return response.data;
    },

    getById: async (id: string): Promise<Order> => {
        const response = await api.get<Order>(`/orders/${id}`);
        return response.data;
    },
};
