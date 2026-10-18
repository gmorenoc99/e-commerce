import { useState } from "react";
import {
    Alert,
    Badge,
    Button,
    Card,
    Container,
    Spinner,
    Table,
} from "react-bootstrap";
import { OrderDetailModal } from "../components/orderDetailModal";
import { useOrders } from "../hooks/useOrders";
import type { Order } from "../types/order";

export const Orders = () => {
    const { data: orders = [], isLoading, isError } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    if (isLoading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Cargando órdenes...</p>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    Ocurrió un error al cargar el historial de compras.
                </Alert>
            </Container>
        );
    }

    if (orders.length === 0) {
        return (
            <Container className="py-5 text-center">
                <Card className="p-4 border-0 shadow-sm">
                    <Card.Body>
                        <h3 className="mb-3">Aún no realizas ninguna compra</h3>
                        <p className="text-muted mb-4">
                            Tus órdenes completadas aparecerán listadas en esta
                            sección.
                        </p>
                        <Button href="/" variant="primary">
                            Ir a la tienda
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="fw-bold mb-4">Compras Realizadas</h2>

            {/* Vista Escritorio */}
            <Card className="border-0 shadow-sm overflow-hidden d-none d-md-block">
                <Table hover className="mb-0 align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Código</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th className="text-end">Total</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>
                                    <Badge
                                        bg="primary"
                                        className="font-monospace"
                                    >
                                        #{order.id}
                                    </Badge>
                                </td>
                                <td className="text-nowrap">
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td className="fw-medium">
                                    {order.buyer.name}
                                </td>
                                <td>{order.buyer.email}</td>
                                <td>{order.buyer.phone}</td>
                                <td className="text-end fw-bold text-success">
                                    ${order.total.toFixed(2)}
                                </td>
                                <td className="text-center">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        Ver detalles
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            {/* Vista Móvil */}
            <div className="d-md-none d-flex flex-column gap-3">
                {orders.map((order) => (
                    <Card key={order.id} className="border-0 shadow-sm p-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Badge bg="primary" className="font-monospace fs-6">
                                #{order.id}
                            </Badge>
                            <small className="text-muted">
                                {new Date(order.date).toLocaleDateString()}
                            </small>
                        </div>

                        <div className="mb-2">
                            <div className="fw-bold text-dark">
                                {order.buyer.name}
                            </div>
                            <div className="text-muted small">
                                {order.buyer.email}
                            </div>
                            <div className="text-muted small">
                                {order.buyer.phone}
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-2">
                            <div>
                                <span className="text-muted small d-block">
                                    Total
                                </span>
                                <span className="fw-bold text-success fs-5">
                                    ${order.total.toFixed(2)}
                                </span>
                            </div>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                            >
                                Ver detalles
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <OrderDetailModal
                order={selectedOrder}
                show={Boolean(selectedOrder)}
                onClose={() => setSelectedOrder(null)}
            />
        </Container>
    );
};
