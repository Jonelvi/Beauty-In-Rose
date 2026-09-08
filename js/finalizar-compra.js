/* =========================================
   BEAUTY IN ROSE - CHECKOUT
   Resumen del pedido, datos de envío y pago.
   Es una simulación con fines educativos:
   no se procesa ningún pago real.
   ========================================= */

var COSTO_ENVIO = 3000;

function crearFilaResumen(item) {
  var li = document.createElement("li");
  li.className = "resumen-item";
  li.innerHTML =
    "<span>" + item.nombre + " × " + item.cantidad + "</span>" +
    "<span>" + formatearPrecio(item.precio * item.cantidad) + "</span>";
  return li;
}

function renderizarResumenCheckout() {
  var lista = document.getElementById("listaResumenCheckout");
  if (lista === null) {
    return;
  }

  var carrito = obtenerCarrito();
  var vacio = document.getElementById("checkoutVacio");
  var contenido = document.getElementById("checkoutContenido");

  if (carrito.length === 0) {
    vacio.classList.remove("oculto");
    contenido.classList.add("oculto");
    return;
  }

  vacio.classList.add("oculto");
  contenido.classList.remove("oculto");

  lista.innerHTML = "";
  for (var i = 0; i < carrito.length; i++) {
    lista.appendChild(crearFilaResumen(carrito[i]));
  }

  var subtotal = calcularTotal(carrito);
  document.getElementById("subtotalCheckout").textContent = formatearPrecio(subtotal);
  document.getElementById("envioCheckout").textContent = formatearPrecio(COSTO_ENVIO);
  document.getElementById("totalCheckout").textContent = formatearPrecio(subtotal + COSTO_ENVIO);
}

function obtenerMetodoPagoElegido() {
  var radios = document.querySelectorAll('input[name="metodoPago"]');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return "";
}

function actualizarCamposPago() {
  var metodo = obtenerMetodoPagoElegido();
  var camposTarjeta = document.getElementById("camposTarjeta");
  if (metodo === "tarjeta") {
    camposTarjeta.classList.remove("oculto");
  } else {
    camposTarjeta.classList.add("oculto");
  }
}

function validarDatosTarjeta(mensajeError) {
  var numeroTarjeta = document.getElementById("numeroTarjeta");
  var expiracion = document.getElementById("expiracionTarjeta");
  var cvv = document.getElementById("cvvTarjeta");
  var soloDigitos = numeroTarjeta.value.split(" ").join("");
  var regexNumero = /^[0-9]{16}$/;
  var regexExpiracion = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
  var regexCvv = /^[0-9]{3,4}$/;

  if (!regexNumero.test(soloDigitos)) {
    mensajeError.textContent = "Ingresa un número de tarjeta válido (16 dígitos).";
    numeroTarjeta.focus();
    return false;
  }

  if (!regexExpiracion.test(expiracion.value.trim())) {
    mensajeError.textContent = "Ingresa la fecha de vencimiento en formato MM/AA.";
    expiracion.focus();
    return false;
  }

  if (!regexCvv.test(cvv.value.trim())) {
    mensajeError.textContent = "Ingresa un CVV válido.";
    cvv.focus();
    return false;
  }

  return true;
}

function alEnviarFormularioCheckout(evento) {
  evento.preventDefault();

  var nombre = document.getElementById("nombreCheckout");
  var correo = document.getElementById("correoCheckout");
  var telefono = document.getElementById("telefonoCheckout");
  var direccion = document.getElementById("direccionCheckout");
  var comuna = document.getElementById("comunaCheckout");
  var ciudad = document.getElementById("ciudadCheckout");
  var mensajeError = document.getElementById("mensajeCheckoutError");
  var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nombre.value.trim().length < 3) {
    mensajeError.textContent = "Ingresa tu nombre completo.";
    nombre.focus();
    return;
  }

  if (!regexCorreo.test(correo.value.trim())) {
    mensajeError.textContent = "Ingresa un correo electrónico válido.";
    correo.focus();
    return;
  }

  if (telefono.value.trim().length < 8) {
    mensajeError.textContent = "Ingresa un teléfono de contacto válido.";
    telefono.focus();
    return;
  }

  if (direccion.value.trim().length < 5) {
    mensajeError.textContent = "Ingresa tu dirección de envío.";
    direccion.focus();
    return;
  }

  if (comuna.value.trim().length === 0) {
    mensajeError.textContent = "Completa la comuna de envío.";
    comuna.focus();
    return;
  }

  if (ciudad.value.trim().length === 0) {
    mensajeError.textContent = "Completa la ciudad de envío.";
    ciudad.focus();
    return;
  }

  var metodoPago = obtenerMetodoPagoElegido();
  if (metodoPago === "tarjeta") {
    var tarjetaValida = validarDatosTarjeta(mensajeError);
    if (!tarjetaValida) {
      return;
    }
  }

  var numeroPedido = "BIR-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("numeroPedido").textContent = "#" + numeroPedido;

  vaciarCarrito();
  document.getElementById("checkoutContenido").classList.add("oculto");
  document.getElementById("checkoutVacio").classList.add("oculto");
  document.getElementById("checkoutConfirmacion").classList.remove("oculto");
}

document.addEventListener("DOMContentLoaded", function () {
  var formCheckout = document.getElementById("formCheckout");
  if (formCheckout === null) {
    return;
  }

  renderizarResumenCheckout();

  var sesion = obtenerSesion();
  if (sesion !== null) {
    document.getElementById("nombreCheckout").value = sesion.nombre;
    document.getElementById("correoCheckout").value = sesion.correo;
  }

  var radiosPago = document.querySelectorAll('input[name="metodoPago"]');
  for (var i = 0; i < radiosPago.length; i++) {
    radiosPago[i].addEventListener("change", actualizarCamposPago);
  }
  actualizarCamposPago();

  formCheckout.addEventListener("submit", alEnviarFormularioCheckout);
});
