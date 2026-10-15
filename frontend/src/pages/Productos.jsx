import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BarraBusqueda from "../components/BarraBusqueda";
import FiltroCategorias from "../components/FiltroCategorias";
import ListaProductos from "../components/ListaProductos";
import { useCarrito } from "../context/CarritoContext";
import { useTienda } from "../context/TiendaContext";
import { filtrarProductos, obtenerCategorias } from "../utils/filtros";

function Productos() {
  const { productos } = useTienda();
  const { agregar } = useCarrito();
  const [parametros] = useSearchParams();
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState(parametros.get("categoria") || "Todas");
  const [orden, setOrden] = useState("ninguno");

  const categorias = obtenerCategorias(productos);
  const visibles = filtrarProductos(productos, busqueda, categoria, orden);

  return (
    <div className="container py-4">
      <h1 className="titulo-seccion">Nuestros Productos</h1>
      <p>Encuentra el producto perfecto para realzar tu belleza natural.</p>

      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-8">
          <BarraBusqueda valor={busqueda} alCambiar={setBusqueda} />
        </div>
        <div className="col-12 col-md-4 mb-3">
          <label htmlFor="orden" className="form-label visually-hidden">Ordenar por</label>
          <select
            id="orden"
            className="form-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="ninguno">Ordenar por...</option>
            <option value="menor">Precio: menor a mayor</option>
            <option value="mayor">Precio: mayor a menor</option>
            <option value="nombre">Nombre (A-Z)</option>
          </select>
        </div>
      </div>

      <FiltroCategorias
        categorias={categorias}
        seleccionada={categoria}
        alSeleccionar={setCategoria}
      />

      <p className="text-muted">{visibles.length} producto(s) encontrado(s)</p>
      <ListaProductos productos={visibles} alAgregar={agregar} />
    </div>
  );
}

export default Productos;
