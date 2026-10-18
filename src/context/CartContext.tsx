import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types/product";

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addItem: (product: Product, quantity: number) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    isInCart: (id: string) => boolean;
    totalQuantity: number;
    totalPrice: number;
}

const CART_STORAGE_KEY = "ecommerce-cart";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            return storedCart ? (JSON.parse(storedCart) as CartItem[]) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addItem = (product: Product, quantity: number) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex(
                (item) => item.id === product.id,
            );
            if (existingIndex > -1) {
                return prevCart.map((item, index) => {
                    if (index === existingIndex) {
                        const newQuantity = Math.min(
                            item.quantity + quantity,
                            product.stock,
                        );
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });
            }
            const initialQuantity = Math.min(quantity, product.stock);
            return [...prevCart, { ...product, quantity: initialQuantity }];
        });
    };

    const removeItem = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (id: string) => {
        return cart.some((item) => item.id === id);
    };

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addItem,
                removeItem,
                clearCart,
                isInCart,
                totalQuantity,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
