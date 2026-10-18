import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import { NavBar } from "../components/navBar";

export const RootLayout = () => {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <NavBar />
            <Container as="main" className="py-4 flex-grow-1">
                <Outlet />
            </Container>
        </div>
    );
};
