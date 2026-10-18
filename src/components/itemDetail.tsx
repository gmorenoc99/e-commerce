import { useContext } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { useCategory } from "../hooks/useCategory";
import type { Product } from "../types/product";
import { ItemQuantitySelector } from "./itemQuantitySelector";

interface ItemDetailProps {
    product: Product;
}

export const ItemDetail = ({ product }: ItemDetailProps) => {
    const { cart, addItem } = useContext(CartContext)!;

    const { data: category } = useCategory(product.categoryId);
    const categoryName = category ? category.name : product.categoryId;

    const itemInCart = cart.find((item) => item.id === product.id);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;

    const availableStock = product.stock - quantityInCart;

    const handleAdd = (quantity: number) => {
        if (quantity <= availableStock) {
            addItem(product, quantity);
        }
    };

    return (
        <Card className="shadow-sm border-0 rounded-3 overflow-hidden p-3 p-md-4">
            <Row className="g-4 align-items-center">
                <Col xs={12} md={6} className="text-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid rounded-3"
                        style={{
                            maxHeight: "400px",
                            objectFit: "contain",
                            width: "100%",
                        }}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <div className="d-flex flex-column gap-3">
                        <div>
                            <Badge
                                bg="secondary"
                                className="text-uppercase mb-2"
                            >
                                {categoryName}
                            </Badge>
                            <h1 className="h3 fw-bold text-dark mb-2">
                                {product.title}
                            </h1>
                            <span className="fs-3 fw-bold text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        <p className="text-muted leading-relaxed mb-0">
                            {product.description}
                        </p>

                        <hr className="my-2" />

                        {availableStock > 0 ? (
                            <ItemQuantitySelector
                                stock={availableStock}
                                onAdd={handleAdd}
                            />
                        ) : (
                            <div
                                className="alert alert-warning mb-0"
                                role="alert"
                            >
                                Ya has alcanzado el límite de stock disponible (
                                {product.stock} unidades) en tu carrito.
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Card>
    );
};
