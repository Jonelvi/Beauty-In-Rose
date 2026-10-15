import { Link } from "react-router-dom";
import { formatearPrecio, porcentajeDescuento, precioFinal } from "../utils/formato";

// Props:
//  - producto: objeto con los datos del producto
//  - alAgregar: funcion que se ejecuta al presionar "Agregar al carro"
function TarjetaProducto({ producto, alAgregar }) {
  const enOferta = Boolean(producto.precioOferta);
  const sinStock = producto.stock <= 0;

  return (
    <article className="card h-100 tarjeta-producto">
      {enOferta && (
        <span className="badge bg-rose-dark etiqueta-descuento">
          -{porcentajeDescuento(producto)}%
        </span>
      )}
      <Link to={"/producto/" + producto.id}>
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
      </Link>
      <div className="card-body d-flex flex-column">
        <Link to={"/producto/" + producto.id} className="titulo-producto">
          <h3 className="h5">{producto.nombre}</h3>
        </Link>
        <p className="card-text flex-grow-1">{producto.descripcion.slice(0, 70)}...</p>
        <p className="precio mb-3">
          {enOferta && (
            <span className="precio-anterior me-2">{formatearPrecio(producto.precio)}</span>
          )}
          <span className="precio-actual">{formatearPrecio(precioFinal(producto))}</span>
        </p>
        <button
          type="button"
          className="btn btn-outline-rose w-100"
          disabled={sinStock}
          onClick={() => alAgregar(producto)}
        >
          {sinStock ? "Sin stock" : "Agregar al carro"}
        </button>
      </div>
    </article>
  );
}

export default TarjetaProducto;
