import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import type { Product } from "../types/product";

interface ItemProps {
    product: Product;
}

export const Item = ({ product }: ItemProps) => {
    const navigate = useNavigate();

    return (
        <Card className="h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fs-6 fw-bold text-dark text-truncate mb-2">
                    {product.title}
                </Card.Title>
                <div className="d-flex align-items-center justify-content-between mt-auto pt-2">
                    <span className="fs-5 fw-bold text-primary">
                        ${product.price.toFixed(2)}
                    </span>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate(`/item/${product.id}`)}
                    >
                        Ver más
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
