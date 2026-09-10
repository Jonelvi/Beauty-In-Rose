/* =========================================
   BEAUTY IN ROSE - PANEL DE ADMINISTRACIÓN
   Permite ver y cambiar el rol de los usuarios
   (cliente o vendedor) y agregar o editar
   productos del catálogo.
   ========================================= */

function crearFilaUsuario(usuario) {
  var rol = usuario.rol;
  if (rol === undefined || rol === "admin") {
    rol = "cliente";
  }

  var fila = document.createElement("tr");
  fila.innerHTML =
    "<td>" + usuario.nombre + "</td>" +
    "<td>" + usuario.correo + "</td>" +
    "<td>" + (usuario.telefono ? usuario.telefono : "-") + "</td>" +
    "<td>" +
    '<select class="selector-rol" data-correo="' + usuario.correo + '">' +
    '<option value="cliente"' + (rol === "cliente" ? " selected" : "") + ">Cliente</option>" +
    '<option value="vendedor"' + (rol === "vendedor" ? " selected" : "") + ">Vendedor</option>" +
    "</select>" +
    "</td>" +
    "<td><button type=\"button\" class=\"btn-secundario btn-guardar-rol\" data-correo=\"" + usuario.correo + "\">Guardar</button></td>";
  return fila;
}

function renderizarUsuarios() {
  var cuerpo = document.getElementById("cuerpoTablaUsuarios");
  var vacio = document.getElementById("usuariosVacio");
  if (cuerpo === null) {
    return;
  }

  var usuarios = obtenerUsuarios();
  cuerpo.innerHTML = "";

  if (usuarios.length === 0) {
    vacio.classList.remove("oculto");
    return;
  }

  vacio.classList.add("oculto");
  for (var i = 0; i < usuarios.length; i++) {
    cuerpo.appendChild(crearFilaUsuario(usuarios[i]));
  }
}

function guardarRolUsuario(correo, nuevoRol) {
  var usuarios = obtenerUsuarios();
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo === correo) {
      usuarios[i].rol = nuevoRol;
    }
  }
  guardarUsuarios(usuarios);
}

function crearFilaProducto(producto, esNuevo) {
  var fila = document.createElement("article");
  fila.className = "admin-producto-fila";
  fila.innerHTML =
    '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">' +
    '<div class="admin-producto-info">' +
    "<h3>" + producto.nombre + "</h3>" +
    '<label>Precio<input type="number" class="admin-input-precio" min="1" value="' + producto.precio + '"></label>' +
    '<label>Descripción<textarea class="admin-input-descripcion" rows="2">' + producto.descripcion + "</textarea></label>" +
    "</div>" +
    '<div class="admin-producto-acciones">' +
    '<button type="button" class="btn-secundario btn-guardar-producto" data-id="' + producto.id + '">Guardar</button>' +
    (esNuevo ? '<button type="button" class="btn-eliminar-item btn-eliminar-producto" data-id="' + producto.id + '">🗑 Eliminar</button>' : "") +
    "</div>";
  return fila;
}

function renderizarProductosAdmin() {
  var contenedor = document.getElementById("listaProductosAdmin");
  if (contenedor === null) {
    return;
  }

  var nuevos = obtenerProductosNuevos();
  var idsNuevos = [];
  for (var j = 0; j < nuevos.length; j++) {
    idsNuevos.push(nuevos[j].id);
  }

  var todos = obtenerTodosLosProductos();
  contenedor.innerHTML = "";

  for (var i = 0; i < todos.length; i++) {
    var esNuevo = idsNuevos.indexOf(todos[i].id) !== -1;
    contenedor.appendChild(crearFilaProducto(todos[i], esNuevo));
  }
}

function guardarEdicionProducto(id, nuevoPrecio, nuevaDescripcion) {
  var nuevos = obtenerProductosNuevos();
  for (var i = 0; i < nuevos.length; i++) {
    if (nuevos[i].id === id) {
      nuevos[i].precio = nuevoPrecio;
      nuevos[i].descripcion = nuevaDescripcion;
      guardarProductosNuevos(nuevos);
      return;
    }
  }

  var producto = buscarProductoPorId(id);
  if (producto === null) {
    return;
  }

  var cambios = obtenerCambiosProductos();
  cambios[id] = {
    nombre: producto.nombre,
    precio: nuevoPrecio,
    imagen: producto.imagen,
    descripcion: nuevaDescripcion
  };
  guardarCambiosProductos(cambios);
}

function eliminarProductoNuevo(id) {
  var nuevos = obtenerProductosNuevos();
  var restantes = [];
  for (var i = 0; i < nuevos.length; i++) {
    if (nuevos[i].id !== id) {
      restantes.push(nuevos[i]);
    }
  }
  guardarProductosNuevos(restantes);
}

function alEnviarNuevoProducto(evento) {
  evento.preventDefault();

  var nombre = document.getElementById("nombreNuevoProducto");
  var precio = document.getElementById("precioNuevoProducto");
  var categoria = document.getElementById("categoriaNuevoProducto");
  var imagen = document.getElementById("imagenNuevoProducto");
  var descripcion = document.getElementById("descripcionNuevoProducto");
  var mensajeError = document.getElementById("mensajeNuevoProductoError");

  if (nombre.value.trim().length < 3) {
    mensajeError.textContent = "Ingresa un nombre de producto válido.";
    nombre.focus();
    return;
  }

  var precioNumero = Number(precio.value);
  if (!precioNumero || precioNumero <= 0) {
    mensajeError.textContent = "Ingresa un precio válido.";
    precio.focus();
    return;
  }

  if (descripcion.value.trim().length < 10) {
    mensajeError.textContent = "La descripción debe tener al menos 10 caracteres.";
    descripcion.focus();
    return;
  }

  var id = generarIdProducto(nombre.value);
  var idOriginal = id;
  var contador = 2;
  while (buscarProductoPorId(id) !== null) {
    id = idOriginal + "-" + contador;
    contador = contador + 1;
  }

  var imagenFinal = imagen.value.trim();
  if (imagenFinal === "") {
    imagenFinal = "https://placehold.co/300x300/fce4ec/6d2149?text=" + encodeURIComponent(nombre.value.trim());
  }

  var nuevoProducto = {
    id: id,
    nombre: nombre.value.trim(),
    precio: precioNumero,
    imagen: imagenFinal,
    categoria: categoria.value,
    descripcion: descripcion.value.trim()
  };

  var nuevos = obtenerProductosNuevos();
  nuevos.push(nuevoProducto);
  guardarProductosNuevos(nuevos);

  mensajeError.style.color = "#2e7d32";
  mensajeError.textContent = "¡Producto agregado! Ya aparece en el catálogo.";
  document.getElementById("formNuevoProducto").reset();
  renderizarProductosAdmin();
}

document.addEventListener("DOMContentLoaded", function () {
  if (typeof protegerPaginaAdmin === "function") {
    protegerPaginaAdmin();
  }

  renderizarUsuarios();
  renderizarProductosAdmin();

  var cuerpoUsuarios = document.getElementById("cuerpoTablaUsuarios");
  if (cuerpoUsuarios !== null) {
    cuerpoUsuarios.addEventListener("click", function (evento) {
      var boton = evento.target.closest(".btn-guardar-rol");
      if (boton === null) {
        return;
      }
      var correo = boton.getAttribute("data-correo");
      var selector = document.querySelector('.selector-rol[data-correo="' + correo + '"]');
      guardarRolUsuario(correo, selector.value);
      mostrarNotificacion("Rol actualizado");
    });
  }

  var listaProductos = document.getElementById("listaProductosAdmin");
  if (listaProductos !== null) {
    listaProductos.addEventListener("click", function (evento) {
      var botonGuardar = evento.target.closest(".btn-guardar-producto");
      var botonEliminar = evento.target.closest(".btn-eliminar-producto");

      if (botonGuardar !== null) {
        var fila = botonGuardar.closest(".admin-producto-fila");
        var id = botonGuardar.getAttribute("data-id");
        var nuevoPrecio = Number(fila.querySelector(".admin-input-precio").value);
        var nuevaDescripcion = fila.querySelector(".admin-input-descripcion").value.trim();
        guardarEdicionProducto(id, nuevoPrecio, nuevaDescripcion);
        mostrarNotificacion("Producto actualizado");
        renderizarProductosAdmin();
      }

      if (botonEliminar !== null) {
        var idEliminar = botonEliminar.getAttribute("data-id");
        eliminarProductoNuevo(idEliminar);
        mostrarNotificacion("Producto eliminado");
        renderizarProductosAdmin();
      }
    });
  }

  var formNuevoProducto = document.getElementById("formNuevoProducto");
  if (formNuevoProducto !== null) {
    formNuevoProducto.addEventListener("submit", alEnviarNuevoProducto);
  }
});
