/* =========================================
   BEAUTY IN ROSE - DETALLE DE PRODUCTO
   Lee el id del producto desde la URL
   (ej: producto.html?id=labial-mate-rose)
   y muestra su información en la página.
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  var contenedor = document.getElementById("detalleProducto");
  var noEncontrado = document.getElementById("productoNoEncontrado");
  if (contenedor === null) {
    return;
  }

  var parametros = new URLSearchParams(window.location.search);
  var id = parametros.get("id");
  var producto = id === null ? null : buscarProductoPorId(id);

  if (producto === null) {
    contenedor.classList.add("oculto");
    noEncontrado.classList.remove("oculto");
    return;
  }

  document.title = producto.nombre + " | Beauty in Rose";
  document.getElementById("imagenProducto").src = producto.imagen;
  document.getElementById("imagenProducto").alt = producto.nombre;
  document.getElementById("categoriaProducto").textContent = producto.categoria;
  document.getElementById("nombreProducto").textContent = producto.nombre;
  document.getElementById("precioProducto").textContent = formatearPrecio(producto.precio);
  document.getElementById("descripcionProducto").textContent = producto.descripcion;

  var botonAgregar = document.getElementById("btnAgregarDetalle");
  botonAgregar.addEventListener("click", function () {
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen
    });
  });
});
