import { Link, useLocation } from "react-router-dom";

function CompraFallida() {
  const { state } = useLocation();
  const motivo = state && state.motivo ? state.motivo : "No pudimos procesar tu pago.";

  return (
    <div className="container py-5 text-center">
      <div className="icono-resultado error">✕</div>
      <h1 className="titulo-seccion">No se pudo realizar el pago</h1>
      <p>{motivo}</p>
      <p>Tu carrito sigue guardado, puedes intentarlo nuevamente con otro método de pago.</p>
      <Link to="/checkout" className="btn btn-rose me-2">Volver a intentar</Link>
      <Link to="/carrito" className="btn btn-outline-rose">Revisar carrito</Link>
    </div>
  );
}

export default CompraFallida;
