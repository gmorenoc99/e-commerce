import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Badge, Button, Card, Table } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

export const Brief = () => {
    const { cart, removeItem, clearCart, totalPrice } =
        useContext(CartContext)!;

    if (cart.length === 0) {
        return (
            <Card className="text-center p-4 border-0 shadow-sm">
                <Card.Body>
                    <h5 className="text-muted">El carrito está vacío.</h5>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-sm p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">Resumen de Compra</h4>
                <Button variant="outline-danger" size="sm" onClick={clearCart}>
                    Vaciar Carrito
                </Button>
            </div>

            <div className="d-none d-md-block table-responsive">
                <Table hover className="align-middle">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th className="text-center">Precio</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-end">Subtotal</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "contain",
                                            }}
                                        />
                                        <span className="fw-medium">
                                            {item.title}
                                        </span>
                                    </div>
                                </td>
                                <td className="text-center">
                                    ${item.price.toFixed(2)}
                                </td>
                                <td className="text-center">
                                    <Badge bg="secondary" className="px-3 py-2">
                                        {item.quantity}
                                    </Badge>
                                </td>
                                <td className="text-end fw-bold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                                <td className="text-center">
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                        aria-label={`Eliminar ${item.title}`}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className="d-md-none d-flex flex-column gap-3">
                {cart.map((item) => (
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
                        <div className="flex-grow-1">
                            <h6 className="mb-1 fw-bold">{item.title}</h6>
                            <div className="text-muted small mb-1">
                                Cantidad: <strong>{item.quantity}</strong> × $
                                {item.price.toFixed(2)}
                            </div>
                            <div className="fw-bold text-primary">
                                Subtotal: $
                                {(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Eliminar ${item.title}`}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                ))}
            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-between align-items-center fs-5 fw-bold">
                <span>Total a pagar:</span>
                <span className="text-primary fs-4">
                    ${totalPrice.toFixed(2)}
                </span>
            </div>
        </Card>
    );
};
