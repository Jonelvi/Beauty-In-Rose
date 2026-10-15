import { createContext, useContext, useState } from "react";
import {
  guardarCarritoEnStorage,
  obtenerCarritoGuardado,
} from "../data/baseDatos";
import { precioFinal } from "../utils/formato";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(obtenerCarritoGuardado());
  const [aviso, setAviso] = useState("");

  function actualizar(nuevosItems) {
    setItems(nuevosItems);
    guardarCarritoEnStorage(nuevosItems);
  }

  function mostrarAviso(texto) {
    setAviso(texto);
    setTimeout(() => setAviso(""), 2000);
  }

  function agregar(producto) {
    mostrarAviso(producto.nombre + " se agregó al carrito");
    const existe = items.find((i) => i.id === producto.id);
    if (existe) {
      actualizar(
        items.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        )
      );
    } else {
      actualizar([
        ...items,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: precioFinal(producto),
          imagen: producto.imagen,
          cantidad: 1,
        },
      ]);
    }
  }

  function cambiarCantidad(id, cambio) {
    const nuevos = items
      .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + cambio } : i))
      .filter((i) => i.cantidad > 0);
    actualizar(nuevos);
  }

  function quitar(id) {
    actualizar(items.filter((i) => i.id !== id));
  }

  function vaciar() {
    actualizar([]);
  }

  const total = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
  const cantidadTotal = items.reduce((suma, i) => suma + i.cantidad, 0);

  const valor = {
    items,
    total,
    cantidadTotal,
    aviso,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
  };

  return (
    <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
