import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router/dom";
import { CartProvider } from "./context/CartContext";
import { router } from "./router";
config.autoAddCss = false;

const queryClient = new QueryClient();

export const ECommerce = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
