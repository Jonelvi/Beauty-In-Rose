# Beauty in Rose 🌷

Tienda web de cosméticos y cuidado de la piel, desarrollada para la Evaluación Formativa N°1 del ramo **DSY1104 - Desarrollo Fullstack II**.

Sitio 100% estático hecho con **HTML5, CSS3 y JavaScript** (sin frameworks ni backend). El carrito, la sesión de usuario y los pedidos se guardan en el `localStorage` del navegador.

## Páginas del sitio

- **Inicio** (`index.html`): producto más popular, productos destacados, video de maquillaje, ofertas del día y newsletter.
- **Productos** (`productos.html`): catálogo completo, agrupado por categoría.
- **Detalle de producto** (`producto.html`): ficha individual de un producto.
- **Blog** (`blog.html`): listado de artículos de belleza.
- **Detalle de artículo** (`blog-post.html`): artículo completo.
- **Nosotros** (`nosotros.html`): historia, misión, visión y equipo de desarrollo.
- **Contacto** (`contacto.html`): formulario de contacto e información de la tienda.
- **Iniciar sesión** (`login.html`) y **Registrarse** (`registro.html`): con validación en JavaScript.
- **Finalizar compra** (`checkout.html`): resumen del pedido, datos de envío y pago.
- **Panel de Administración** (`admin.html`): gestión de usuarios/vendedores y de productos (solo accesible para la cuenta de administrador).

## Funcionalidades principales

- **Carrito de compras**: agregar, quitar, sumar/restar cantidad y vaciar. Se mantiene guardado aunque se cambie de página.
- **Vista individual de producto**: cada producto tiene su propia ficha con descripción completa.
- **Video de maquillaje**: tutorial embebido en la página de inicio.
- **Ofertas del día**: productos con descuento y precio tachado.
- **Registro e inicio de sesión**: validado con JavaScript, la sesión se mantiene mientras se navega por el sitio (aparece "Hola, [nombre]" en el menú).
- **Checkout simulado**: formulario de envío y método de pago (tarjeta o efectivo). No procesa pagos reales, es solo para fines educativos.
- **Formularios validados con JS**: newsletter, contacto, registro, login y checkout, todos con mensajes de error claros.
- **Blog**: artículos de tips de belleza.
- **Menú hamburguesa**: en celular, el menú se colapsa en un botón; el carrito queda siempre visible.
- **Diseño responsivo**: se adapta a celular, tablet y escritorio.
- **Panel de administración**: cambiar el rol de los usuarios (Cliente/Vendedor), editar precio y descripción de productos, y agregar productos nuevos que aparecen automáticamente en el catálogo.

### Cómo entrar como administrador

En `login.html`, ingresa con:

- **Correo:** `admin@beautyinrose.cl`
- **Contraseña:** `Admin1234`

Esto redirige directo al panel de administración (`admin.html`). Ahí no se ve el ícono normal de "Iniciar sesión", sino el enlace **Admin** en el menú.

## Estructura de carpetas

```
beauty-in-rose/
├── index.html, productos.html, producto.html, blog.html, blog-post.html,
│   nosotros.html, contacto.html, login.html, registro.html, checkout.html,
│   admin.html
├── css/
│   └── style.css              → todos los estilos del sitio
├── img/
│   ├── productos/               → fotos de los productos
│   ├── equipo/                  → fotos del equipo de desarrollo
│   ├── nosotros-fachada.jpg     → foto de la tienda para "Nuestra Historia"
│   └── logo.svg, beauty-in-rose-logo.svg
└── js/
    ├── carrito.js               → lógica del carrito de compras
    ├── menu.js                  → menú hamburguesa en celular
    ├── autenticacion.js         → registro, login, sesión de usuario y acceso admin
    ├── administracion.js        → lógica del panel de administración
    ├── finalizar-compra.js      → resumen del pedido y validación del checkout
    ├── formularios.js           → validación del newsletter y el contacto
    ├── datos-productos.js       → catálogo base + productos y cambios del admin
    ├── producto-detalle.js      → arma la ficha de producto según la URL (?id=...)
    ├── actualizar-productos.js  → aplica en el catálogo los cambios hechos por el admin
    ├── datos-blog.js            → contenido de los artículos del blog
    └── blog-detalle.js          → arma el artículo según la URL (?id=...)
```

## Equipo de desarrollo

- Camila Venegas
- Francisca Escobar
- Jonelvi Castro
