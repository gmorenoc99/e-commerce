import { Badge, Button, Modal, Table } from "react-bootstrap";
import type { Order } from "../types/order";

interface OrderDetailModalProps {
    order: Order | null;
    show: boolean;
    onClose: () => void;
}

export const OrderDetailModal = ({
    order,
    show,
    onClose,
}: OrderDetailModalProps) => {
    if (!order) return null;

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold fs-5 fs-md-4">
                    Detalle de la Orden #{order.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-3 p-md-4">
                <div className="mb-4 p-3 bg-light rounded">
                    <h6 className="fw-bold text-muted mb-2">
                        Datos del Comprador
                    </h6>
                    <p className="mb-1 text-break">
                        <strong>Nombre:</strong> {order.buyer.name}
                    </p>
                    <p className="mb-1 text-break">
                        <strong>Email:</strong> {order.buyer.email}
                    </p>
                    <p className="mb-0 text-break">
                        <strong>Teléfono:</strong> {order.buyer.phone}
                    </p>
                </div>

                <h6 className="fw-bold text-muted mb-3">Artículos Comprados</h6>

                {/* VISTA ESCRITORIO (Tabla): Se oculta en móviles y se muestra de 'md' en adelante */}
                <div className="d-none d-md-block">
                    <Table hover className="border align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Producto</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-end">Precio Unitario</th>
                                <th className="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{
                                                    width: "45px",
                                                    height: "45px",
                                                    objectFit: "contain",
                                                }}
                                            />
                                            <span className="fw-medium">
                                                {item.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <Badge
                                            bg="secondary"
                                            className="px-3 py-2"
                                        >
                                            {item.quantity}
                                        </Badge>
                                    </td>
                                    <td className="text-end">
                                        ${item.price.toFixed(2)}
                                    </td>
                                    <td className="text-end fw-bold">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2,
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* VISTA MÓVIL (Tarjetas): Se muestra en móviles ('xs' y 'sm') y se oculta de 'md' en adelante */}
                <div className="d-block d-md-none d-flex flex-column gap-3">
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded p-3 d-flex gap-3 align-items-center"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "contain",
                                }}
                            />
                            <div className="flex-grow-1 min-w-0">
                                <h6 className="mb-1 fw-bold text-truncate">
                                    {item.title}
                                </h6>
                                <div className="text-muted small mb-1">
                                    Cantidad: <strong>{item.quantity}</strong> ×
                                    ${item.price.toFixed(2)}
                                </div>
                                <div className="fw-bold text-primary">
                                    Subtotal: $
                                    {(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                    <span className="fs-5 fw-bold">Total Pagado:</span>
                    <span className="fs-4 fw-bold text-primary">
                        ${order.total.toFixed(2)}
                    </span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
