import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../services/categoriesService";
import type { Category } from "../types/category";

export const useCategory = (categoryId?: string) => {
    return useQuery<Category, Error>({
        queryKey: ["category", categoryId],
        queryFn: () => categoriesService.getById(categoryId!),
        enabled: Boolean(categoryId),
        staleTime: 1000 * 60 * 5,
    });
};
