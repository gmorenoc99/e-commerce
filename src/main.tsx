import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ECommerce } from "./e-commerce";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ECommerce />
    </StrictMode>,
);
