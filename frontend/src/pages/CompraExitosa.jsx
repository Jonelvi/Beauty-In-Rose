import { Link, useLocation } from "react-router-dom";
import { formatearPrecio } from "../utils/formato";

function CompraExitosa() {
  const { state } = useLocation();
  const pedido = state ? state.pedido : null;

  if (pedido === null) {
    return (
      <div className="container py-5 text-center">
        <p>No hay ninguna compra reciente para mostrar.</p>
        <Link to="/productos" className="btn btn-rose">Ir a productos</Link>
      </div>
    );
  }

  return (
    <div className="container py-5 text-center">
      <div className="icono-resultado exito">✓</div>
      <h1 className="titulo-seccion">¡Gracias por tu compra!</h1>
      <p>Tu pedido <strong>#{pedido.id}</strong> fue confirmado correctamente.</p>

      <div className="card mx-auto shadow-sm resumen-compra text-start">
        <div className="card-body">
          <h2 className="h5">Resumen</h2>
          <ul className="list-unstyled">
            {pedido.items.map((item) => (
              <li key={item.id} className="d-flex justify-content-between">
                <span>{item.nombre} × {item.cantidad}</span>
                <span>{formatearPrecio(item.precio * item.cantidad)}</span>
              </li>
            ))}
          </ul>
          <hr />
          <p className="mb-1">Entrega: {pedido.direccion}</p>
          <p className="fw-bold mb-0">Total pagado: {formatearPrecio(pedido.total)}</p>
        </div>
      </div>

      <Link to="/" className="btn btn-rose mt-4">Volver al inicio</Link>
    </div>
  );
}

export default CompraExitosa;
