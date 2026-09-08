/* =========================================
   BEAUTY IN ROSE - CARRITO DE COMPRAS
   Se guarda en localStorage para que se
   mantenga al cambiar de página.
   ========================================= */

var CARRITO_KEY = "beautyInRoseCarrito";

function obtenerCarrito() {
  var datos = localStorage.getItem(CARRITO_KEY);
  if (datos === null) {
    return [];
  }
  return JSON.parse(datos);
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  actualizarContador();
}

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CL");
}

function buscarProductoEnCarrito(carrito, id) {
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      return carrito[i];
    }
  }
  return null;
}

function agregarAlCarrito(producto) {
  var carrito = obtenerCarrito();
  var existente = buscarProductoEnCarrito(carrito, producto.id);

  if (existente !== null) {
    existente.cantidad = existente.cantidad + 1;
  } else {
    var nuevoProducto = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    };
    carrito.push(nuevoProducto);
  }

  guardarCarrito(carrito);
  renderizarCarrito();
  mostrarNotificacion(producto.nombre + " se agregó al carrito");
  abrirCarrito();
}

function cambiarCantidad(id, delta) {
  var carrito = obtenerCarrito();
  var item = buscarProductoEnCarrito(carrito, id);
  if (item === null) {
    return;
  }

  item.cantidad = item.cantidad + delta;

  if (item.cantidad <= 0) {
    var carritoNuevo = [];
    for (var i = 0; i < carrito.length; i++) {
      if (carrito[i].id !== id) {
        carritoNuevo.push(carrito[i]);
      }
    }
    carrito = carritoNuevo;
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

function eliminarDelCarrito(id) {
  var carrito = obtenerCarrito();
  var carritoNuevo = [];
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== id) {
      carritoNuevo.push(carrito[i]);
    }
  }
  guardarCarrito(carritoNuevo);
  renderizarCarrito();
}

function vaciarCarrito() {
  guardarCarrito([]);
  renderizarCarrito();
}

function calcularTotal(carrito) {
  var total = 0;
  for (var i = 0; i < carrito.length; i++) {
    total = total + carrito[i].precio * carrito[i].cantidad;
  }
  return total;
}

function actualizarContador() {
  var carrito = obtenerCarrito();
  var totalItems = 0;
  for (var i = 0; i < carrito.length; i++) {
    totalItems = totalItems + carrito[i].cantidad;
  }

  var contadores = document.querySelectorAll(".contador-carrito");
  for (var j = 0; j < contadores.length; j++) {
    contadores[j].textContent = totalItems;
  }
}

function crearFilaCarrito(item) {
  var li = document.createElement("li");
  li.className = "carrito-item";
  li.innerHTML =
    '<img src="' + item.imagen + '" alt="' + item.nombre + '">' +
    '<div class="carrito-item-info">' +
    '<p class="carrito-item-nombre">' + item.nombre + '</p>' +
    '<p class="carrito-item-precio">' + formatearPrecio(item.precio) + '</p>' +
    '<div class="carrito-item-cantidad">' +
    '<button type="button" class="btn-cantidad" data-accion="restar" data-id="' + item.id + '">−</button>' +
    '<span>' + item.cantidad + '</span>' +
    '<button type="button" class="btn-cantidad" data-accion="sumar" data-id="' + item.id + '">+</button>' +
    '</div>' +
    '</div>' +
    '<button type="button" class="btn-eliminar-item" data-id="' + item.id + '">🗑</button>';
  return li;
}

function renderizarCarrito() {
  var lista = document.getElementById("listaCarrito");
  var totalEl = document.getElementById("totalCarrito");
  if (lista === null || totalEl === null) {
    return;
  }

  var carrito = obtenerCarrito();
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = '<li class="carrito-vacio">Tu carrito está vacío</li>';
  } else {
    for (var i = 0; i < carrito.length; i++) {
      lista.appendChild(crearFilaCarrito(carrito[i]));
    }
  }

  totalEl.textContent = formatearPrecio(calcularTotal(carrito));
}

function abrirCarrito() {
  var panel = document.getElementById("panelCarrito");
  var overlay = document.getElementById("carritoOverlay");
  if (panel !== null) {
    panel.classList.add("abierto");
  }
  if (overlay !== null) {
    overlay.classList.add("visible");
  }
}

function cerrarCarrito() {
  var panel = document.getElementById("panelCarrito");
  var overlay = document.getElementById("carritoOverlay");
  if (panel !== null) {
    panel.classList.remove("abierto");
  }
  if (overlay !== null) {
    overlay.classList.remove("visible");
  }
}

function mostrarNotificacion(mensaje) {
  var toast = document.createElement("div");
  toast.className = "toast-carrito";
  toast.textContent = mensaje;
  document.body.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("visible");
  }, 10);

  setTimeout(function () {
    toast.classList.remove("visible");
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 2200);
}

function alHacerClickBotonCarrito(evento) {
  var boton = evento.target.closest("button");
  if (boton === null) {
    return;
  }

  var id = boton.getAttribute("data-id");
  if (boton.classList.contains("btn-eliminar-item")) {
    eliminarDelCarrito(id);
  } else if (boton.getAttribute("data-accion") === "sumar") {
    cambiarCantidad(id, 1);
  } else if (boton.getAttribute("data-accion") === "restar") {
    cambiarCantidad(id, -1);
  }
}

function alHacerClickAgregar() {
  var producto = {
    id: this.getAttribute("data-id"),
    nombre: this.getAttribute("data-nombre"),
    precio: Number(this.getAttribute("data-precio")),
    imagen: this.getAttribute("data-imagen")
  };
  agregarAlCarrito(producto);
}

document.addEventListener("DOMContentLoaded", function () {
  actualizarContador();
  renderizarCarrito();

  var botonCarrito = document.getElementById("botonCarrito");
  var botonCerrar = document.getElementById("cerrarCarrito");
  var overlay = document.getElementById("carritoOverlay");
  var botonVaciar = document.getElementById("vaciarCarrito");
  var listaCarrito = document.getElementById("listaCarrito");

  if (botonCarrito !== null) {
    botonCarrito.addEventListener("click", abrirCarrito);
  }
  if (botonCerrar !== null) {
    botonCerrar.addEventListener("click", cerrarCarrito);
  }
  if (overlay !== null) {
    overlay.addEventListener("click", cerrarCarrito);
  }
  if (botonVaciar !== null) {
    botonVaciar.addEventListener("click", vaciarCarrito);
  }
  if (listaCarrito !== null) {
    listaCarrito.addEventListener("click", alHacerClickBotonCarrito);
  }

  var botonesAgregar = document.querySelectorAll(".btn-agregar-carro");
  for (var i = 0; i < botonesAgregar.length; i++) {
    botonesAgregar[i].addEventListener("click", alHacerClickAgregar);
  }
});
