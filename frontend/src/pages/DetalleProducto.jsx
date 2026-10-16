import { Link, useParams } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useTienda } from "../context/TiendaContext";
import { formatearPrecio, precioFinal } from "../utils/formato";

function DetalleProducto() {
  const { id } = useParams();
  const { productos } = useTienda();
  const { agregar } = useCarrito();
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <p>No encontramos ese producto.</p>
        <Link to="/productos" className="btn btn-rose">Ver todos los productos</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link to="/productos" className="d-inline-block mb-3">&larr; Volver a productos</Link>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded-4 shadow w-100" />
        </div>
        <div className="col-12 col-md-6">
          <p className="categoria-producto">{producto.categoria}</p>
          <h1 className="mb-3">{producto.nombre}</h1>
          <p className="precio fs-3">
            {producto.precioOferta && (
              <span className="precio-anterior me-2">{formatearPrecio(producto.precio)}</span>
            )}
            {formatearPrecio(precioFinal(producto))}
          </p>
          <p>{producto.descripcion}</p>
          <p className="text-muted">Stock disponible: {producto.stock}</p>
          <button
            type="button"
            className="btn btn-rose btn-lg"
            disabled={producto.stock <= 0}
            onClick={() => agregar(producto)}
          >
            Agregar al carro
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
