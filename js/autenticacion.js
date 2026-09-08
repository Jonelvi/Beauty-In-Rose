/* =========================================
   BEAUTY IN ROSE - AUTENTICACIÓN
   Registro, inicio de sesión y sesión activa.
   Todo se guarda en localStorage porque este
   proyecto no tiene servidor ni base de datos.
   ========================================= */

var USUARIOS_KEY = "beautyInRoseUsuarios";
var SESION_KEY = "beautyInRoseSesion";
var REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var REGEX_MAYUSCULA = /[A-Z]/;
var REGEX_NUMERO = /[0-9]/;

function passwordEsValida(password) {
  if (password.length < 8) {
    return false;
  }
  if (!REGEX_MAYUSCULA.test(password)) {
    return false;
  }
  if (!REGEX_NUMERO.test(password)) {
    return false;
  }
  return true;
}

function obtenerUsuarios() {
  var datos = localStorage.getItem(USUARIOS_KEY);
  if (datos === null) {
    return [];
  }
  return JSON.parse(datos);
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
}

function correoYaRegistrado(correo) {
  var usuarios = obtenerUsuarios();
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo === correo) {
      return true;
    }
  }
  return false;
}

function buscarUsuario(correo, password) {
  var usuarios = obtenerUsuarios();
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].correo === correo && usuarios[i].password === password) {
      return usuarios[i];
    }
  }
  return null;
}

function obtenerSesion() {
  var datos = localStorage.getItem(SESION_KEY);
  if (datos === null) {
    return null;
  }
  return JSON.parse(datos);
}

function iniciarSesion(usuario) {
  var sesion = { nombre: usuario.nombre, correo: usuario.correo };
  localStorage.setItem(SESION_KEY, JSON.stringify(sesion));
  actualizarNavegacionUsuario();
}

function cerrarSesion() {
  localStorage.removeItem(SESION_KEY);
  actualizarNavegacionUsuario();
}

function actualizarNavegacionUsuario() {
  var sesion = obtenerSesion();
  var navLogin = document.getElementById("navLogin");
  var navRegistro = document.getElementById("navRegistro");
  var navUsuario = document.getElementById("navUsuario");
  var navCerrarSesion = document.getElementById("navCerrarSesion");
  var saludoUsuario = document.getElementById("saludoUsuario");

  if (navLogin === null || navRegistro === null || navUsuario === null || navCerrarSesion === null) {
    return;
  }

  if (sesion !== null) {
    navLogin.classList.add("oculto");
    navRegistro.classList.add("oculto");
    navUsuario.classList.remove("oculto");
    navCerrarSesion.classList.remove("oculto");
    var primerNombre = sesion.nombre.split(" ")[0];
    saludoUsuario.textContent = "Hola, " + primerNombre;
  } else {
    navLogin.classList.remove("oculto");
    navRegistro.classList.remove("oculto");
    navUsuario.classList.add("oculto");
    navCerrarSesion.classList.add("oculto");
  }
}

function validarFormularioRegistro() {
  var nombre = document.getElementById("nombreRegistro");
  var correo = document.getElementById("correoRegistro");
  var password = document.getElementById("passwordRegistro");
  var passwordConfirmar = document.getElementById("passwordConfirmar");
  var terminos = document.getElementById("terminosRegistro");
  var mensajeError = document.getElementById("mensajeRegistroError");

  if (nombre.value.trim().length < 3) {
    mensajeError.textContent = "Ingresa tu nombre completo (mínimo 3 caracteres).";
    nombre.focus();
    return null;
  }

  var correoLimpio = correo.value.trim().toLowerCase();
  if (!REGEX_CORREO.test(correoLimpio)) {
    mensajeError.textContent = "Ingresa un correo electrónico válido.";
    correo.focus();
    return null;
  }

  if (correoYaRegistrado(correoLimpio)) {
    mensajeError.textContent = "Ese correo ya está registrado. Intenta iniciar sesión.";
    correo.focus();
    return null;
  }

  if (!passwordEsValida(password.value)) {
    mensajeError.textContent = "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.";
    password.focus();
    return null;
  }

  if (password.value !== passwordConfirmar.value) {
    mensajeError.textContent = "Las contraseñas no coinciden.";
    passwordConfirmar.focus();
    return null;
  }

  if (!terminos.checked) {
    mensajeError.textContent = "Debes aceptar los términos y condiciones.";
    terminos.focus();
    return null;
  }

  var nuevoUsuario = {
    nombre: nombre.value.trim(),
    correo: correoLimpio,
    telefono: document.getElementById("telefonoRegistro").value.trim(),
    password: password.value
  };
  return nuevoUsuario;
}

function alEnviarFormularioRegistro(evento) {
  evento.preventDefault();
  var mensajeError = document.getElementById("mensajeRegistroError");
  var nuevoUsuario = validarFormularioRegistro();

  if (nuevoUsuario === null) {
    return;
  }

  var usuarios = obtenerUsuarios();
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  iniciarSesion(nuevoUsuario);

  mensajeError.style.color = "#2e7d32";
  mensajeError.textContent = "¡Cuenta creada con éxito! Redirigiendo...";
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1200);
}

function alEnviarFormularioLogin(evento) {
  evento.preventDefault();

  var correo = document.getElementById("correoLogin");
  var password = document.getElementById("passwordLogin");
  var mensajeError = document.getElementById("mensajeLoginError");

  if (!REGEX_CORREO.test(correo.value.trim())) {
    mensajeError.textContent = "Ingresa un correo electrónico válido.";
    correo.focus();
    return;
  }

  if (password.value.trim().length === 0) {
    mensajeError.textContent = "Ingresa tu contraseña.";
    password.focus();
    return;
  }

  var correoLimpio = correo.value.trim().toLowerCase();
  var usuario = buscarUsuario(correoLimpio, password.value);

  if (usuario === null) {
    mensajeError.textContent = "Correo o contraseña incorrectos.";
    return;
  }

  iniciarSesion(usuario);
  mensajeError.style.color = "#2e7d32";
  mensajeError.textContent = "¡Bienvenida, " + usuario.nombre.split(" ")[0] + "! Redirigiendo...";
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  actualizarNavegacionUsuario();

  var botonCerrarSesion = document.getElementById("btnCerrarSesion");
  if (botonCerrarSesion !== null) {
    botonCerrarSesion.addEventListener("click", function () {
      cerrarSesion();
      mostrarNotificacion("Sesión cerrada");
    });
  }

  var formRegistro = document.getElementById("formRegistro");
  if (formRegistro !== null) {
    formRegistro.addEventListener("submit", alEnviarFormularioRegistro);
  }

  var formLogin = document.getElementById("formLogin");
  if (formLogin !== null) {
    formLogin.addEventListener("submit", alEnviarFormularioLogin);
  }
});
