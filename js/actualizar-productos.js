/* =========================================
   BEAUTY IN ROSE - ACTUALIZAR PRODUCTOS
   Aplica en las tarjetas del catálogo los
   cambios de precio/descripción hechos desde
   el panel de administración y agrega las
   tarjetas de los productos nuevos.
   ========================================= */

function aplicarCambiosEnTarjetas() {
  var cambios = obtenerCambiosProductos();
  var botones = document.querySelectorAll(".btn-agregar-carro[data-id]");

  for (var i = 0; i < botones.length; i++) {
    var boton = botones[i];
    var id = boton.getAttribute("data-id");
    var cambio = cambios[id];
    if (cambio === undefined) {
      continue;
    }

    var tarjeta = boton.closest(".producto-card");
    if (tarjeta === null) {
      continue;
    }

    boton.setAttribute("data-precio", cambio.precio);
    boton.setAttribute("data-descripcion", cambio.descripcion);

    var precioOferta = tarjeta.querySelector(".precio-oferta");
    if (precioOferta !== null) {
      precioOferta.textContent = formatearPrecio(cambio.precio);
    } else {
      var precioEl = tarjeta.querySelector(".precio");
      if (precioEl !== null) {
        precioEl.textContent = formatearPrecio(cambio.precio);
      }
    }

    var parrafoDescripcion = tarjeta.querySelector("p:not(.precio)");
    if (parrafoDescripcion !== null) {
      parrafoDescripcion.textContent = cambio.descripcion;
    }
  }
}

function crearTarjetaProductoNuevo(producto) {
  var article = document.createElement("article");
  article.className = "producto-card";
  article.innerHTML =
    '<a href="producto.html?id=' + producto.id + '"><img src="' + producto.imagen + '" alt="' + producto.nombre + '"></a>' +
    '<a href="producto.html?id=' + producto.id + '"><h3>' + producto.nombre + "</h3></a>" +
    "<p>" + producto.descripcion + "</p>" +
    '<p class="precio">' + formatearPrecio(producto.precio) + "</p>" +
    '<button type="button" class="btn-secundario btn-agregar-carro-nuevo" data-id="' + producto.id + '" data-nombre="' + producto.nombre + '" data-precio="' + producto.precio + '" data-imagen="' + producto.imagen + '">Agregar al carro</button>';
  return article;
}

function alHacerClickAgregarNuevo() {
  agregarAlCarrito({
    id: this.getAttribute("data-id"),
    nombre: this.getAttribute("data-nombre"),
    precio: Number(this.getAttribute("data-precio")),
    imagen: this.getAttribute("data-imagen")
  });
}

function mostrarProductosNuevos() {
  var contenedor = document.getElementById("gridProductosNuevos");
  var seccion = document.getElementById("seccionProductosNuevos");
  if (contenedor === null || seccion === null) {
    return;
  }

  var nuevos = obtenerProductosNuevos();
  if (nuevos.length === 0) {
    return;
  }

  var i;
  for (i = 0; i < nuevos.length; i++) {
    contenedor.appendChild(crearTarjetaProductoNuevo(nuevos[i]));
  }
  seccion.classList.remove("oculto");

  var botonesNuevos = contenedor.querySelectorAll(".btn-agregar-carro-nuevo");
  for (i = 0; i < botonesNuevos.length; i++) {
    botonesNuevos[i].addEventListener("click", alHacerClickAgregarNuevo);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  aplicarCambiosEnTarjetas();
  mostrarProductosNuevos();
});
