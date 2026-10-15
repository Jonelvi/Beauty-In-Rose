import { createContext, useContext, useState } from "react";
import {
  buscarUsuarioPorCredenciales,
  crearUsuario,
  guardarSesion,
  obtenerSesionGuardada,
} from "../data/baseDatos";

const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  const [sesion, setSesion] = useState(obtenerSesionGuardada());

  function entrar(usuario) {
    const nueva = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
      rol: usuario.rol,
    };
    guardarSesion(nueva);
    setSesion(nueva);
  }

  // Devuelve true si el correo y la contraseña son correctos
  function iniciarSesion(correo, password) {
    const usuario = buscarUsuarioPorCredenciales(correo, password);
    if (usuario === null) {
      return false;
    }
    entrar(usuario);
    return true;
  }

  // Devuelve el usuario creado o null si el correo ya existe
  function registrarse(datos) {
    const usuario = crearUsuario(datos);
    if (usuario === null) {
      return null;
    }
    entrar(usuario);
    return usuario;
  }

  function cerrarSesion() {
    guardarSesion(null);
    setSesion(null);
  }

  const valor = {
    sesion,
    esAdmin: sesion !== null && sesion.rol === "admin",
    iniciarSesion,
    registrarse,
    cerrarSesion,
  };

  return (
    <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>
  );
}

export function useSesion() {
  return useContext(SesionContext);
}
