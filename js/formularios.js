/* =========================================
   BEAUTY IN ROSE - SCRIPT GENERAL
   Validación del newsletter y del contacto
   ========================================= */

var REGEX_CORREO_SIMPLE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function alEnviarNewsletter(evento) {
  evento.preventDefault();
  var formNewsletter = document.getElementById("formNewsletter");
  var mensajeNewsletter = document.getElementById("mensajeNewsletter");
  var correo = document.getElementById("correoNewsletter");

  if (!REGEX_CORREO_SIMPLE.test(correo.value.trim())) {
    mensajeNewsletter.textContent = "Ingresa un correo electrónico válido.";
    correo.focus();
    return;
  }

  mensajeNewsletter.style.color = "#2e7d32";
  mensajeNewsletter.textContent = "¡Gracias por suscribirte a Beauty in Rose!";
  formNewsletter.reset();
}

function alEnviarContacto(evento) {
  evento.preventDefault();
  var formContacto = document.getElementById("formContacto");
  var mensajeContactoError = document.getElementById("mensajeContactoError");
  var nombre = document.getElementById("nombreContacto");
  var correo = document.getElementById("correoContacto");
  var asunto = document.getElementById("asuntoContacto");
  var mensaje = document.getElementById("mensajeContacto");

  if (nombre.value.trim().length < 3) {
    mensajeContactoError.textContent = "Ingresa tu nombre completo (mínimo 3 caracteres).";
    nombre.focus();
    return;
  }

  if (!REGEX_CORREO_SIMPLE.test(correo.value.trim())) {
    mensajeContactoError.textContent = "Ingresa un correo electrónico válido.";
    correo.focus();
    return;
  }

  if (asunto.value === "") {
    mensajeContactoError.textContent = "Selecciona un asunto para tu mensaje.";
    asunto.focus();
    return;
  }

  if (mensaje.value.trim().length < 10) {
    mensajeContactoError.textContent = "Tu mensaje debe tener al menos 10 caracteres.";
    mensaje.focus();
    return;
  }

  mensajeContactoError.style.color = "#2e7d32";
  mensajeContactoError.textContent = "¡Mensaje enviado! Te responderemos a la brevedad.";
  formContacto.reset();
}

document.addEventListener("DOMContentLoaded", function () {
  var formNewsletter = document.getElementById("formNewsletter");
  if (formNewsletter !== null) {
    formNewsletter.addEventListener("submit", alEnviarNewsletter);
  }

  var formContacto = document.getElementById("formContacto");
  if (formContacto !== null) {
    formContacto.addEventListener("submit", alEnviarContacto);
  }
});
