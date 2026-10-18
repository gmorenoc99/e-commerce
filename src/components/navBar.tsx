import {
    faBagShopping,
    faStore,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar, NavDropdown, Spinner } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router";
import { useCategories } from "../hooks/useCategories";
import { CartWidget } from "./cartWidget";

const UserMenu = () => {
    const navigate = useNavigate();

    return (
        <NavDropdown
            title={
                <span
                    role="img"
                    aria-label="Foto de perfil"
                    className="bg-secondary-subtle text-secondary-emphasis rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: 38, height: 38 }}
                >
                    <FontAwesomeIcon icon={faUser} size="sm" />
                </span>
            }
            id="user-menu-dropdown"
            align="end"
            className="user-dropdown-custom"
        >
            <NavDropdown.Header className="fw-bold">
                Mi Cuenta
            </NavDropdown.Header>
            <NavDropdown.Divider />
            <NavDropdown.Item
                onClick={() => navigate("/orders")}
                className="d-flex align-items-center gap-2 py-2"
            >
                <FontAwesomeIcon
                    icon={faBagShopping}
                    className="text-secondary"
                />
                <span>Mis Compras</span>
            </NavDropdown.Item>
        </NavDropdown>
    );
};

export const NavBar = () => {
    const { data: categories, isLoading } = useCategories();

    return (
        <Navbar
            expand="md"
            sticky="top"
            collapseOnSelect
            className="bg-body-tertiary border-bottom shadow-sm py-2"
        >
            <Container className="d-flex align-items-center justify-content-between">
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="d-flex align-items-center gap-2 fw-bold text-dark"
                >
                    <span
                        className="text-primary-emphasis d-inline-flex align-items-center justify-content-center"
                        style={{
                            width: "36px",
                            height: "36px",
                            minWidth: "36px",
                        }}
                    >
                        <FontAwesomeIcon icon={faStore} size="sm" />
                    </span>
                    <span className="d-none d-sm-inline">Mi Tienda</span>
                </Navbar.Brand>

                <div className="d-flex align-items-center gap-2 gap-md-3 order-md-2 ms-auto">
                    <Navbar.Toggle
                        aria-controls="main-navbar"
                        className="border-0 shadow-none p-0 d-md-none ms-1"
                    />
                    <CartWidget />
                    <UserMenu />
                </div>

                <Navbar.Collapse
                    id="main-navbar"
                    className="w-100 w-md-auto mt-2 mt-md-0 order-md-1"
                >
                    <Nav className="mx-auto my-2 my-md-0 gap-1 text-center text-md-start">
                        <Nav.Link
                            as={NavLink}
                            to="/"
                            end
                            eventKey="/"
                            className="px-3 text-secondary fw-medium"
                        >
                            Inicio
                        </Nav.Link>

                        {isLoading ? (
                            <div className="d-flex align-items-center px-3 justify-content-center">
                                <Spinner animation="border" size="sm" />
                            </div>
                        ) : (
                            categories?.map(({ id, name }) => (
                                <Nav.Link
                                    key={id}
                                    as={NavLink}
                                    to={`/category/${id}`}
                                    eventKey={id}
                                    className="px-3 text-secondary fw-medium"
                                >
                                    {name}
                                </Nav.Link>
                            ))
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
