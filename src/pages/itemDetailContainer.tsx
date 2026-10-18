import { Alert, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import { ItemDetail } from "../components/itemDetail";
import { useProductDetail } from "../hooks/useProductDetail";

export const ItemDetailContainer = () => {
    const { id } = useParams<{ id: string }>();
    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useProductDetail(id || "");

    return (
        <Container className="py-3 py-md-4">
            {isLoading && (
                <div className="d-flex justify-content-center align-items-center py-5">
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="visually-hidden">
                            Cargando producto...
                        </span>
                    </Spinner>
                </div>
            )}

            {isError && (
                <Alert variant="danger" className="text-center">
                    {error?.message ||
                        "Ocurrió un error al cargar el detalle del producto."}
                </Alert>
            )}

            {!isLoading && !isError && !product && (
                <Alert variant="warning" className="text-center">
                    El producto solicitado no fue encontrado.
                </Alert>
            )}

            {product && <ItemDetail product={product} />}
        </Container>
    );
};
