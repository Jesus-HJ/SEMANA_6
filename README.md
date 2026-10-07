# Brasa — pedidos para restaurante

SPA de pedidos construida con React, Vite, React Router y Axios. El proyecto sirve como práctica de componentes y JSX, props y `children`, rutas cliente, carga asíncrona y formulario controlado.

## Requisitos

- Node.js 20 o superior y npm
- Conexión a internet para cargar el menú desde DummyJSON y las fotografías públicas de Unsplash

## Desarrollo

```sh
npm install
npm run dev
```

Para comprobar el build de producción y el estilo del código:

```sh
npm run build
npm run lint
```

## Recorrido de la aplicación

- `/`: portada, propuesta del restaurante y platos destacados.
- `/menu`: menú cargado con Axios desde `https://dummyjson.com/products/category/groceries?limit=30`; permite filtrar por categoría y agregar platos al carrito.
- `/pedido`: resumen del carrito y formulario controlado de entrega y pago de demostración. No envía datos ni procesa pagos.
- Cualquier ruta desconocida muestra la página 404.

`BrowserRouter`, `Routes`, `Route` y `NavLink` gestionan la navegación sin recargar el documento. El contexto `CartProvider` comparte el carrito entre el menú, la cabecera, el cajón del carrito y el formulario.

## Ciclo de vida y estados de carga

`useMenu` solicita el menú en un efecto con `async/await`, guarda carga, datos o error en un único estado y muestra estados explícitos para carga y fallo. `AbortController` cancela la petición al desmontar la vista; esto también evita actualizar una pantalla abandonada durante la comprobación adicional de efectos de React Strict Mode en desarrollo. El efecto solo publica el resultado final, una vez completado el fetch, en lugar de hacer varias actualizaciones relacionadas.

El menú se filtra con datos derivados; la categoría seleccionada es el único estado local del filtro. Los productos usan sus IDs estables de la API como keys. El checkout valida campos requeridos del navegador y confirma un pedido local de demostración.

## Estructura

```text
src/
  components/   Header, cajón del carrito y encabezado reutilizable
  context/      Estado compartido del carrito
  hooks/        Carga del menú y ciclo de vida de la petición
  pages/        Inicio, menú, pedido y página no encontrada
  services/     Petición HTTP y transformación de los datos del menú
```

Para inspeccionar CSR, abre DevTools: al navegar entre páginas la pestaña Network no debe mostrar una nueva solicitud de tipo document; el menú sí realiza una petición XHR/fetch al entrar a `/menu`. La pestaña Console muestra los errores de carga cuando la API no está disponible.
