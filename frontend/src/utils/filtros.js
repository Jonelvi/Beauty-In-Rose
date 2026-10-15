import { precioFinal } from "./formato";

// Devuelve las categorias distintas que existen en la lista de productos
export function obtenerCategorias(productos) {
  const categorias = [];
  productos.forEach((p) => {
    if (!categorias.includes(p.categoria)) {
      categorias.push(p.categoria);
    }
  });
  return categorias;
}

// Aplica busqueda por texto, filtro por categoria y orden
export function filtrarProductos(productos, busqueda, categoria, orden) {
  const texto = busqueda.trim().toLowerCase();

  let resultado = productos.filter((p) => {
    const coincideTexto =
      texto === "" ||
      p.nombre.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "Todas" || p.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  if (orden === "menor") {
    resultado = [...resultado].sort((a, b) => precioFinal(a) - precioFinal(b));
  } else if (orden === "mayor") {
    resultado = [...resultado].sort((a, b) => precioFinal(b) - precioFinal(a));
  } else if (orden === "nombre") {
    resultado = [...resultado].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  return resultado;
}
