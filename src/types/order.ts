import type { StockDeductionItem } from "./stockDeductionItem";

export interface Buyer {
    name: string;
    email: string;
    phone: string;
}

export interface PurchasedItem extends StockDeductionItem {
    title: string;
    price: number;
    image: string;
}

export interface Order {
    id: string;
    buyer: Buyer;
    items: PurchasedItem[];
    total: number;
    date: string;
}
