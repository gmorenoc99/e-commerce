import type { Category } from "../types/category";
import { api } from "./api";

export const categoriesService = {
    getAll: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>("/categories");
        return response.data;
    },

    getById: async (id: string): Promise<Category> => {
        const response = await api.get<Category>(`/categories/${id}`);
        return response.data;
    },
};
