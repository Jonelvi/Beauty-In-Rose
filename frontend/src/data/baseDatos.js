// "Base de datos" simulada del proyecto. Guarda todo en localStorage y
// ofrece funciones CRUD (crear, leer, actualizar, eliminar) para
// productos, usuarios y pedidos.

import { productosIniciales } from "./productosIniciales";
import { generarId } from "../utils/formato";

export const CLAVES = {
  productos: "bir_productos",
  usuarios: "bir_usuarios",
  pedidos: "bir_pedidos",
  sesion: "bir_sesion",
  carrito: "bir_carrito",
};

const usuariosIniciales = [
  {
    id: 1,
    nombre: "Administrador",
    correo: "admin@beautyinrose.cl",
    telefono: "",
    password: "Admin1234",
    rol: "admin",
  },
];

function leer(clave, valorInicial) {
  const datos = localStorage.getItem(clave);
  if (datos === null) {
    return valorInicial;
  }
  return JSON.parse(datos);
}

function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

// ---------- PRODUCTOS ----------

export function obtenerProductos() {
  return leer(CLAVES.productos, productosIniciales);
}

export function obtenerProductoPorId(id) {
  return obtenerProductos().find((p) => p.id === id) || null;
}

export function crearProducto(datos) {
  const productos = obtenerProductos();
  let id = generarId(datos.nombre);
  const idBase = id;
  let contador = 2;
  while (productos.some((p) => p.id === id)) {
    id = idBase + "-" + contador;
    contador = contador + 1;
  }
  const nuevo = {
    id: id,
    nombre: datos.nombre,
    precio: Number(datos.precio),
    precioOferta: datos.precioOferta ? Number(datos.precioOferta) : null,
    stock: Number(datos.stock),
    imagen: datos.imagen || "/img/logo.svg",
    categoria: datos.categoria,
    descripcion: datos.descripcion,
  };
  const lista = [...productos, nuevo];
  guardar(CLAVES.productos, lista);
  return nuevo;
}

export function actualizarProducto(id, cambios) {
  const lista = obtenerProductos().map((p) => {
    if (p.id === id) {
      return { ...p, ...cambios };
    }
    return p;
  });
  guardar(CLAVES.productos, lista);
  return lista.find((p) => p.id === id) || null;
}

export function eliminarProducto(id) {
  const lista = obtenerProductos().filter((p) => p.id !== id);
  guardar(CLAVES.productos, lista);
}

// ---------- USUARIOS ----------

export function obtenerUsuarios() {
  return leer(CLAVES.usuarios, usuariosIniciales);
}

export function crearUsuario(datos) {
  const usuarios = obtenerUsuarios();
  const correo = datos.correo.trim().toLowerCase();
  if (usuarios.some((u) => u.correo === correo)) {
    return null;
  }
  const ultimoId = usuarios.reduce((mayor, u) => Math.max(mayor, u.id), 0);
  const nuevo = {
    id: ultimoId + 1,
    nombre: datos.nombre.trim(),
    correo: correo,
    telefono: datos.telefono || "",
    password: datos.password,
    rol: datos.rol || "cliente",
  };
  guardar(CLAVES.usuarios, [...usuarios, nuevo]);
  return nuevo;
}

export function actualizarUsuario(id, cambios) {
  const lista = obtenerUsuarios().map((u) => {
    if (u.id === id) {
      return { ...u, ...cambios };
    }
    return u;
  });
  guardar(CLAVES.usuarios, lista);
}

export function eliminarUsuario(id) {
  const lista = obtenerUsuarios().filter((u) => u.id !== id);
  guardar(CLAVES.usuarios, lista);
}

export function buscarUsuarioPorCredenciales(correo, password) {
  const correoLimpio = correo.trim().toLowerCase();
  return (
    obtenerUsuarios().find(
      (u) => u.correo === correoLimpio && u.password === password
    ) || null
  );
}

// ---------- PEDIDOS ----------

export function obtenerPedidos() {
  return leer(CLAVES.pedidos, []);
}

export function crearPedido(datos) {
  const numero = "BIR-" + Math.floor(100000 + Math.random() * 900000);
  const pedido = {
    id: numero,
    fecha: new Date().toLocaleDateString("es-CL"),
    cliente: datos.cliente,
    correo: datos.correo,
    direccion: datos.direccion,
    metodoPago: datos.metodoPago,
    items: datos.items,
    total: datos.total,
    estado: "Pagado",
  };
  guardar(CLAVES.pedidos, [...obtenerPedidos(), pedido]);
  return pedido;
}

export function actualizarPedido(id, cambios) {
  const lista = obtenerPedidos().map((p) => {
    if (p.id === id) {
      return { ...p, ...cambios };
    }
    return p;
  });
  guardar(CLAVES.pedidos, lista);
}

export function eliminarPedido(id) {
  guardar(
    CLAVES.pedidos,
    obtenerPedidos().filter((p) => p.id !== id)
  );
}

// ---------- SESION Y CARRITO ----------

export function obtenerSesionGuardada() {
  return leer(CLAVES.sesion, null);
}

export function guardarSesion(sesion) {
  if (sesion === null) {
    localStorage.removeItem(CLAVES.sesion);
  } else {
    guardar(CLAVES.sesion, sesion);
  }
}

export function obtenerCarritoGuardado() {
  return leer(CLAVES.carrito, []);
}

export function guardarCarritoEnStorage(carrito) {
  guardar(CLAVES.carrito, carrito);
}
