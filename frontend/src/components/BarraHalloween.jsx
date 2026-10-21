import { Link } from "react-router-dom";

// Franja de anuncio de la campaña de Halloween (arriba del todo)
function BarraHalloween() {
  return (
    <div className="barra-halloween">
      🎃 Especial Halloween: hasta 25% de descuento en productos seleccionados 🦇{" "}
      <Link to="/ofertas" className="text-decoration-underline">Ver ofertas</Link>
    </div>
  );
}

export default BarraHalloween;
