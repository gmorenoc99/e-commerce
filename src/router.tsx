import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layout/rootLayout";
import { Checkout } from "./pages/checkout";
import { ItemDetailContainer } from "./pages/itemDetailContainer";
import { ItemListContainer } from "./pages/itemListContainer";
import { Orders } from "./pages/orders";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: (
                    <ItemListContainer greeting="¡Bienvenidos a nuestra tienda!" />
                ),
            },
            {
                path: "category/:categoryId",
                element: <ItemListContainer />,
            },
            {
                path: "item/:id",
                element: <ItemDetailContainer />,
            },
            {
                path: "cart",
                element: <Checkout />,
            },
            { path: "orders", element: <Orders /> },
        ],
    },
]);
