# Beauty in Rose 🌷

Tienda web de cosméticos y cuidado de la piel, desarrollada para la Evaluación Formativa N°1 del ramo **DSY1104 - Desarrollo Fullstack II**.

Sitio 100% estático hecho con **HTML5, CSS3 y JavaScript** (sin frameworks ni backend). El carrito, la sesión de usuario y los pedidos se guardan en el `localStorage` del navegador.

## Páginas del sitio

| Página | Archivo | Descripción |
|---|---|---|
| Inicio | `index.html` | Producto más popular, productos destacados, ofertas del día y newsletter |
| Productos | `productos.html` | Catálogo completo, agrupado por categoría |
| Detalle de producto | `producto.html` | Ficha individual de un producto (`producto.html?id=...`) |
| Blog | `blog.html` | Listado de artículos de belleza |
| Detalle de artículo | `blog-post.html` | Artículo completo (`blog-post.html?id=...`) |
| Nosotros | `nosotros.html` | Historia, misión, visión y equipo de desarrollo |
| Contacto | `contacto.html` | Formulario de contacto e información de la tienda |
| Iniciar sesión | `login.html` | Login con validación |
| Registrarse | `registro.html` | Creación de cuenta con validación |
| Finalizar compra | `checkout.html` | Resumen del pedido, datos de envío y pago |

## Funcionalidades principales

- **Carrito de compras**: agregar, quitar, sumar/restar cantidad y vaciar. Se mantiene guardado aunque se cambie de página.
- **Vista individual de producto**: cada producto tiene su propia ficha con descripción completa.
- **Ofertas del día**: productos con descuento y precio tachado.
- **Registro e inicio de sesión**: validado con JavaScript, la sesión se mantiene mientras se navega por el sitio (aparece "Hola, [nombre]" en el menú).
- **Checkout simulado**: formulario de envío y método de pago (tarjeta o efectivo). No procesa pagos reales, es solo para fines educativos.
- **Formularios validados con JS**: newsletter, contacto, registro, login y checkout, todos con mensajes de error claros.
- **Blog**: artículos de tips de belleza.
- **Diseño responsivo**: se adapta a celular, tablet y escritorio.

## Estructura de carpetas

```
beauty-in-rose/
├── index.html, productos.html, producto.html, blog.html, blog-post.html,
│   nosotros.html, contacto.html, login.html, registro.html, checkout.html
├── css/
│   └── style.css              → todos los estilos del sitio
├── img/
│   ├── productos/              → fotos de los productos
│   ├── equipo/                 → fotos del equipo de desarrollo
│   └── logo.svg, beauty-in-rose-logo.svg
└── js/
    ├── carrito.js               → lógica del carrito de compras
    ├── autenticacion.js         → registro, login y sesión de usuario
    ├── finalizar-compra.js      → resumen del pedido y validación del checkout
    ├── formularios.js           → validación del newsletter y el contacto
    ├── datos-productos.js       → información de todos los productos (id, nombre, precio, descripción)
    ├── producto-detalle.js      → arma la ficha de producto según la URL (?id=...)
    ├── datos-blog.js            → contenido de los artículos del blog
    └── blog-detalle.js          → arma el artículo según la URL (?id=...)
```

## Cómo revisar el sitio

Como es un sitio estático, solo necesitas abrir `index.html` en el navegador. Para que el carrito y la sesión funcionen igual que en la demo (y evitar restricciones del navegador al leer archivos locales), es recomendable abrirlo con un servidor simple, por ejemplo:

```bash
python -m http.server 5500
```

y luego entrar a `http://localhost:5500` en el navegador.

## Equipo de desarrollo

- Camila Venegas
- Francisca Escobar
- Jonelvi Castro
