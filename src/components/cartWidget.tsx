import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";

export const CartWidget = () => {
    const context = useContext(CartContext);
    const quantity = context?.totalQuantity ?? 0;
    const label = quantity > 99 ? "99+" : String(quantity);

    return (
        <Nav.Link
            as={Link}
            to="/cart"
            aria-label={`Carrito de compras con ${quantity} productos`}
            className="d-flex align-items-center text-decoration-none p-1"
        >
            <div className="position-relative d-inline-flex align-items-center">
                <FontAwesomeIcon
                    icon={faCartShopping}
                    size="lg"
                    className="text-secondary"
                />
                {quantity > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary text-white border border-light">
                        {label}
                    </span>
                )}
            </div>
        </Nav.Link>
    );
};
