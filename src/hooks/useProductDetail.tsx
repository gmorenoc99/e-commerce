import { useQuery } from "@tanstack/react-query";
import { productsService } from "../services/productsService";
import type { Product } from "../types/product";

export const useProductDetail = (id: string) => {
    return useQuery<Product, Error>({
        queryKey: ["product", id],
        queryFn: () => productsService.getById(id),
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5,
    });
};
