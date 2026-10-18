import { Button, Modal } from "react-bootstrap";

interface OrderSuccessModalProps {
    show: boolean;
    orderId: string | null;
    onClose: () => void;
}

export const OrderSuccessModal = ({
    show,
    orderId,
    onClose,
}: OrderSuccessModalProps) => {
    return (
        <Modal show={show} onHide={onClose} centered backdrop="static">
            <Modal.Body className="text-center p-4">
                <div className="mb-3">
                    <i className="bi bi-check-circle-fill text-success fs-1"></i>
                </div>
                <h3 className="fw-bold mb-3">¡Gracias por tu compra!</h3>
                <p className="text-muted mb-4">
                    Tu orden ha sido registrada exitosamente con el código:{" "}
                    <strong className="text-dark">#{orderId}</strong>
                </p>
                <Button
                    href="/"
                    variant="primary"
                    size="lg"
                    className="w-100"
                    onClick={onClose}
                >
                    Volver a la tienda
                </Button>
            </Modal.Body>
        </Modal>
    );
};
