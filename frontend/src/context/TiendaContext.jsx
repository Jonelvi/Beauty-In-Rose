import { createContext, useContext, useState } from "react";
import {
  actualizarPedido,
  actualizarProducto,
  actualizarUsuario,
  crearPedido,
  crearProducto,
  eliminarPedido,
  eliminarProducto,
  eliminarUsuario,
  obtenerPedidos,
  obtenerProductos,
  obtenerUsuarios,
} from "../data/baseDatos";

// Mantiene en memoria los datos de la "base de datos" para que la
// interfaz se actualice apenas se crea, edita o elimina algo.
const TiendaContext = createContext(null);

export function TiendaProvider({ children }) {
  const [productos, setProductos] = useState(obtenerProductos());
  const [usuarios, setUsuarios] = useState(obtenerUsuarios());
  const [pedidos, setPedidos] = useState(obtenerPedidos());

  function agregarProducto(datos) {
    const nuevo = crearProducto(datos);
    setProductos(obtenerProductos());
    return nuevo;
  }

  function editarProducto(id, cambios) {
    actualizarProducto(id, cambios);
    setProductos(obtenerProductos());
  }

  function borrarProducto(id) {
    eliminarProducto(id);
    setProductos(obtenerProductos());
  }

  function editarUsuario(id, cambios) {
    actualizarUsuario(id, cambios);
    setUsuarios(obtenerUsuarios());
  }

  function borrarUsuario(id) {
    eliminarUsuario(id);
    setUsuarios(obtenerUsuarios());
  }

  function refrescarUsuarios() {
    setUsuarios(obtenerUsuarios());
  }

  function registrarPedido(datos) {
    const pedido = crearPedido(datos);
    setPedidos(obtenerPedidos());
    return pedido;
  }

  function editarPedido(id, cambios) {
    actualizarPedido(id, cambios);
    setPedidos(obtenerPedidos());
  }

  function borrarPedido(id) {
    eliminarPedido(id);
    setPedidos(obtenerPedidos());
  }

  const valor = {
    productos,
    usuarios,
    pedidos,
    agregarProducto,
    editarProducto,
    borrarProducto,
    editarUsuario,
    borrarUsuario,
    refrescarUsuarios,
    registrarPedido,
    editarPedido,
    borrarPedido,
  };

  return (
    <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>
  );
}

export function useTienda() {
  return useContext(TiendaContext);
}
