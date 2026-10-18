import { Col, Row } from "react-bootstrap";
import type { Product } from "../types/product";
import { Item } from "./item";

interface ItemListProps {
    products: Product[];
}

export const ItemList = ({ products }: ItemListProps) => {
    return (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3 g-md-4">
            {products.map((product) => (
                <Col key={product.id}>
                    <Item product={product} />
                </Col>
            ))}
        </Row>
    );
};
