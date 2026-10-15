// Funciones de apoyo para mostrar precios y generar ids

export function formatearPrecio(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}

export function generarId(nombre) {
  let id = nombre.toLowerCase().trim();
  id = id.replace(/[áàä]/g, "a");
  id = id.replace(/[éèë]/g, "e");
  id = id.replace(/[íìï]/g, "i");
  id = id.replace(/[óòö]/g, "o");
  id = id.replace(/[úùü]/g, "u");
  id = id.replace(/ñ/g, "n");
  id = id.replace(/[^a-z0-9]+/g, "-");
  id = id.replace(/^-+/, "").replace(/-+$/, "");
  return id;
}

// Si el producto esta en oferta devuelve el precio con descuento
export function precioFinal(producto) {
  if (producto.precioOferta) {
    return producto.precioOferta;
  }
  return producto.precio;
}

export function porcentajeDescuento(producto) {
  if (!producto.precioOferta) {
    return 0;
  }
  return Math.round((1 - producto.precioOferta / producto.precio) * 100);
}
