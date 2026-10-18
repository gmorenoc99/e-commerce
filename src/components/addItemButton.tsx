import { useContext } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import type { Product } from "../types/product";

interface AddItemButtonProps {
    product: Product;
    quantity: number;
    className?: string;
}

export const AddItemButton = ({
    product,
    quantity,
    className = "",
}: AddItemButtonProps) => {
    const context = useContext(CartContext);

    const { addItem } = context;

    const handleAdd = () => {
        addItem(product, quantity);
    };

    return (
        <Button
            variant="primary"
            size="lg"
            disabled={product.stock === 0 || quantity < 1}
            onClick={handleAdd}
            className={`w-100 ${className}`}
        >
            {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </Button>
    );
};
