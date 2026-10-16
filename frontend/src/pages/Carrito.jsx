import { Link } from "react-router-dom";
import ItemCarrito from "../components/ItemCarrito";
import EncabezadoPagina from "../components/EncabezadoPagina";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/formato";

function Carrito() {
  const { items, total, cambiarCantidad, quitar, vaciar } = useCarrito();

  if (items.length === 0) {
    return (
      <>
        <EncabezadoPagina titulo="Tu carrito" />
        <div className="container py-5 text-center">
          <p className="fs-5">Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-rose">Ver productos</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <EncabezadoPagina titulo="Tu carrito" subtitulo="Revisa tus productos antes de pagar." />
      <div className="container pb-5">
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <ul className="list-group shadow-sm">
            {items.map((item) => (
              <ItemCarrito
                key={item.id}
                item={item}
                alCambiarCantidad={cambiarCantidad}
                alQuitar={quitar}
              />
            ))}
          </ul>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm resumen-sticky">
            <div className="card-body p-4">
              <h2 className="h5">Resumen</h2>
              <p className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>{formatearPrecio(total)}</strong>
              </p>
              <Link to="/checkout" className="btn btn-rose w-100 mb-2">Ir a pagar</Link>
              <button type="button" className="btn btn-outline-rose w-100" onClick={vaciar}>
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Carrito;
