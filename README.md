# E-commerce

Aplicación web de tienda online desarrollada como proyecto frontend. Permite consultar un catálogo de productos por categoría, ver sus detalles y disponibilidad, añadir productos al carrito, simular una compra y consultar las órdenes registradas. Los datos se guardan en un backend local simulado con JSON Server; no hay integración con una pasarela de pago.

## Tecnologías principales

Las versiones son los rangos declarados en `package.json`:

| Herramienta     | Versión declarada   | Uso                                          |
| --------------- | ------------------- | -------------------------------------------- |
| React           | `^19.2.8`           | Interfaz y componentes                       |
| TypeScript      | `~6.0.2`            | Tipado estático                              |
| Vite            | `^8.3.0`            | Servidor de desarrollo y compilación         |
| React Router    | `^8.4.0`            | Navegación y rutas                           |
| TanStack Query  | `^5.104.3`          | Consultas, caché y mutaciones de datos       |
| Axios           | `^1.20.0`           | Comunicación HTTP con la API local           |
| Bootstrap       | `^5.3.8`            | Estilos y sistema responsive                 |
| React Bootstrap | `^2.10.10`          | Componentes de interfaz basados en Bootstrap |
| Font Awesome    | `^7.3.1` / `^3.5.0` | Iconos (`svg-core` y React Font Awesome)     |
| JSON Server     | `^1.0.0-beta.15`    | API REST local basada en `db.json`           |
| ESLint          | `^10.10.0`          | Análisis estático del código                 |

El archivo `package-lock.json` fija las versiones instaladas para reproducir la instalación con `npm ci`.

## Estructura del proyecto

```text
e-commerce/
├── db.json                         # Datos locales: productos, categorías y órdenes
├── index.html                      # Documento HTML de entrada
├── package.json                    # Dependencias y scripts npm
├── package-lock.json               # Versiones resueltas de dependencias
├── vite.config.ts                  # Configuración de Vite
├── tsconfig*.json                  # Configuración de TypeScript
├── eslint.config.js                # Configuración de ESLint
├── public/                         # Recursos estáticos públicos
└── src/
	├── main.tsx                    # Punto de entrada de React
	├── e-commerce.tsx              # Proveedores globales y router
	├── router.tsx                  # Definición de rutas
	├── index.css                   # Estilos propios
	├── assets/                     # Recursos importados por la aplicación
	├── components/                 # Piezas reutilizables de interfaz
	│   ├── addItemButton.tsx
	│   ├── brief.tsx               # Resumen del carrito
	│   ├── cartWidget.tsx
	│   ├── item.tsx
	│   ├── itemDetail.tsx
	│   ├── itemList.tsx
	│   ├── itemQuantitySelector.tsx
	│   ├── navBar.tsx
	│   ├── orderDetailModal.tsx
	│   └── orderSuccessModal.tsx
	├── context/
	│   └── CartContext.tsx         # Estado compartido del carrito
	├── hooks/                      # Hooks de consultas y operaciones
	│   ├── useCategories.tsx
	│   ├── useCategory.tsx
	│   ├── useCheckout.tsx
	│   ├── useDeductStock.tsx
	│   ├── useOrders.tsx
	│   ├── useproductdetail.tsx
	│   └── useProducts.tsx
	├── layout/
	│   └── rootLayout.tsx          # Navegación y marco común de las páginas
	├── pages/                      # Vistas asociadas a las rutas
	│   ├── checkout.tsx
	│   ├── itemDetailContainer.tsx
	│   ├── itemListContainer.tsx
	│   └── orders.tsx
	├── services/                   # Acceso HTTP a los recursos de la API
	│   ├── api.ts
	│   ├── categoriesService.ts
	│   ├── ordersService.ts
	│   └── productsService.ts
	└── types/                      # Tipos de dominio
		├── category.ts
		├── order.ts
		├── product.ts
		└── stockDeductionItem.ts
```

## Instalación y arranque

Se necesita Node.js y npm instalados. Desde la carpeta raíz del proyecto, instala las dependencias:

```bash
npm ci
```

La aplicación utiliza dos procesos locales. Inicia cada uno en una terminal distinta.

Terminal 1, API simulada en `http://localhost:3001`:

```bash
npm run server
```

Terminal 2, aplicación Vite:

```bash
npm run dev
```

Abre en el navegador la URL que indique Vite, normalmente `http://localhost:5173`. Mantén ambas terminales ejecutándose mientras uses la aplicación.

## Navegación

- **Inicio (`/`)**: muestra el catálogo completo.
- **Categorías (`/category/:categoryId`)**: usa los enlaces de la barra superior para filtrar productos por categoría.
- **Detalle (`/item/:id`)**: selecciona “Ver más” en un producto para consultar descripción y stock, elegir cantidad y añadirlo al carrito.
- **Carrito (`/cart`)**: abre el icono del carrito para revisar productos, eliminar artículos o vaciarlo y completar los datos del comprador.
- **Compras (`/orders`)**: abre el menú de usuario y selecciona “Mis Compras”; desde el historial puedes consultar el detalle de cada orden.

Al confirmar la compra, la aplicación valida y descuenta el stock en JSON Server, registra la orden y muestra un comprobante con su código.
