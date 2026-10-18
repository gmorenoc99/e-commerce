import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap";
import { Brief } from "../components/brief";
import { OrderSuccessModal } from "../components/orderSuccessModal";
import { useCheckout } from "../hooks/useCheckout";

export const Checkout = () => {
    const {
        buyer,
        setBuyer,
        orderId,
        errorMessage,
        clearError,
        isSubmitting,
        handleSubmit,
        cart,
    } = useCheckout();

    if (cart.length === 0 && !orderId) {
        return (
            <Container className="py-5 text-center">
                <Card className="p-4 border-0 shadow-sm">
                    <Card.Body>
                        <h3 className="mb-3">Tu carrito está vacío</h3>
                        <p className="text-muted mb-4">
                            Explora nuestros productos y agrega lo que te guste.
                        </p>
                        <Button href="/" variant="primary">
                            Ir al catálogo
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="fw-bold mb-4">Finalizar Compra</h2>

            {errorMessage && (
                <Alert
                    variant="danger"
                    dismissible
                    onClose={clearError}
                    className="mb-4"
                >
                    {errorMessage}
                </Alert>
            )}

            <Row className="g-4">
                <Col xs={12} lg={7}>
                    <Brief />
                </Col>
                <Col xs={12} lg={5}>
                    <Card className="border-0 shadow-sm p-3 p-md-4">
                        <h4 className="fw-bold mb-3">Datos del Comprador</h4>
                        <Form
                            onSubmit={handleSubmit}
                            className="d-flex flex-column gap-3"
                        >
                            <Form.Group controlId="buyerName">
                                <Form.Label className="fw-medium">
                                    Nombre completo
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Ej. María Pérez"
                                    value={buyer.name}
                                    onChange={(e) =>
                                        setBuyer({
                                            ...buyer,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="buyerEmail">
                                <Form.Label className="fw-medium">
                                    Correo Electrónico
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    placeholder="ejemplo@correo.com"
                                    value={buyer.email}
                                    onChange={(e) =>
                                        setBuyer({
                                            ...buyer,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="buyerPhone">
                                <Form.Label className="fw-medium">
                                    Teléfono
                                </Form.Label>
                                <Form.Control
                                    type="tel"
                                    required
                                    placeholder="+57 300 123 4567"
                                    value={buyer.phone}
                                    onChange={(e) =>
                                        setBuyer({
                                            ...buyer,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="success"
                                size="lg"
                                className="w-100 mt-3"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Validando y procesando..."
                                    : "Confirmar y Pagar"}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>

            <OrderSuccessModal
                show={Boolean(orderId)}
                orderId={orderId}
                onClose={() => {
                    window.location.href = "/";
                }}
            />
        </Container>
    );
};
