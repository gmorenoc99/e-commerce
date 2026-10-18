import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface ItemQuantitySelectorProps {
    stock: number;
    initialStock?: number;
    onAdd: (quantity: number) => void;
}

export const ItemQuantitySelector = ({
    stock,
    initialStock = 1,
    onAdd,
}: ItemQuantitySelectorProps) => {
    const [quantity, setQuantity] = useState<number>(initialStock);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrement = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2">
                <InputGroup style={{ width: "130px" }}>
                    <Button
                        variant="outline-secondary"
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                    >
                        -
                    </Button>
                    <Form.Control
                        type="text"
                        value={quantity}
                        readOnly
                        className="text-center bg-white fw-bold"
                    />
                    <Button
                        variant="outline-secondary"
                        onClick={handleIncrement}
                        disabled={quantity >= stock}
                    >
                        +
                    </Button>
                </InputGroup>
                <span className="text-muted small">
                    Stock disponible: {stock}
                </span>
            </div>

            <Button
                variant="primary"
                size="lg"
                disabled={stock === 0}
                onClick={() => onAdd(quantity)}
                className="w-100"
            >
                {stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </Button>
        </div>
    );
};
