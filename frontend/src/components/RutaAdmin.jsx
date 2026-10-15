import { Navigate } from "react-router-dom";
import { useSesion } from "../context/SesionContext";

// Solo deja ver el contenido a quien tenga rol de administrador
function RutaAdmin({ children }) {
  const { esAdmin } = useSesion();
  if (!esAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RutaAdmin;
