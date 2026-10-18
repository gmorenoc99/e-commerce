import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "../services/productsService";
import type { StockDeductionItem } from "../types/stockDeductionItem";

export const useDeductStock = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (items: StockDeductionItem[]) =>
            productsService.deductStockBatch(items),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
    });
};
