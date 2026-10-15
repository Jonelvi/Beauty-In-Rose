// Validaciones simples de formularios. Cada funcion devuelve un texto con
// el error o "" cuando el valor esta correcto.

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarNombre(nombre) {
  if (nombre.trim().length < 3) {
    return "Ingresa tu nombre completo (mínimo 3 caracteres).";
  }
  return "";
}

export function validarCorreo(correo) {
  if (!REGEX_CORREO.test(correo.trim())) {
    return "Ingresa un correo electrónico válido.";
  }
  return "";
}

export function validarPassword(password) {
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  if (!/[A-Z]/.test(password)) {
    return "La contraseña debe tener al menos una mayúscula.";
  }
  if (!/[0-9]/.test(password)) {
    return "La contraseña debe tener al menos un número.";
  }
  return "";
}

export function validarTelefono(telefono) {
  if (telefono.trim().length < 8) {
    return "Ingresa un teléfono de contacto válido.";
  }
  return "";
}

export function validarMensaje(mensaje) {
  if (mensaje.trim().length < 10) {
    return "Tu mensaje debe tener al menos 10 caracteres.";
  }
  return "";
}

export function validarTarjeta(numero) {
  const soloDigitos = numero.split(" ").join("");
  if (!/^[0-9]{16}$/.test(soloDigitos)) {
    return "Ingresa un número de tarjeta válido (16 dígitos).";
  }
  return "";
}
