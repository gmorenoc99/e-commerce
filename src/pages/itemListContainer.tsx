import { Alert, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { ItemList } from "../components/itemList";
import { useProducts } from "../hooks/useProducts";

interface ItemListContainerProps {
    greeting?: string;
}

export const ItemListContainer = ({ greeting }: ItemListContainerProps) => {
    const { categoryId } = useParams<{ categoryId?: string }>();
    const {
        data: products,
        isLoading,
        isError,
        error,
    } = useProducts(categoryId);

    return (
        <Container className="py-3 py-md-4">
            {greeting && (
                <div className="p-3 p-md-4 mb-4 bg-light rounded-3 shadow-sm text-center">
                    <h1 className="h4 h3-md fw-bold text-dark m-0">
                        {greeting}
                    </h1>
                </div>
            )}

            {isLoading && (
                <div className="d-flex justify-content-center align-items-center py-5">
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
            )}

            {isError && (
                <Alert variant="danger" className="text-center">
                    {error?.message || "Error al cargar los productos."}
                </Alert>
            )}

            {products && products.length === 0 && (
                <Alert variant="info" className="text-center">
                    No se encontraron productos disponibles.
                </Alert>
            )}

            {products && products.length > 0 && (
                <ItemList products={products} />
            )}
        </Container>
    );
};
