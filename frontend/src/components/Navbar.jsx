import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useSesion } from "../context/SesionContext";

function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const { cantidadTotal } = useCarrito();
  const { sesion, esAdmin, cerrarSesion } = useSesion();
  const navigate = useNavigate();

  function cerrar() {
    setAbierto(false);
  }

  function salir() {
    cerrarSesion();
    cerrar();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={cerrar}>
          <img src="/img/beauty-in-rose-logo.svg" alt="Beauty in Rose" />
        </Link>

        <div className="d-flex align-items-center gap-3 order-lg-3">
          <Link to="/carrito" className="btn-carrito position-relative" onClick={cerrar} aria-label="Ver carrito">
            🛍️
            <span className="badge rounded-pill bg-rose position-absolute top-0 start-100 translate-middle">
              {cantidadTotal}
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={abierto}
            onClick={() => setAbierto(!abierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={"collapse navbar-collapse" + (abierto ? " show" : "")}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item"><NavLink className="nav-link" to="/" end onClick={cerrar}>Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/productos" onClick={cerrar}>Productos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/categorias" onClick={cerrar}>Categorías</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ofertas" onClick={cerrar}>Ofertas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog" onClick={cerrar}>Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros" onClick={cerrar}>Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto" onClick={cerrar}>Contacto</NavLink></li>
            {esAdmin && (
              <li className="nav-item"><NavLink className="nav-link" to="/admin" onClick={cerrar}>Admin</NavLink></li>
            )}
            {sesion === null ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login" onClick={cerrar}>Iniciar sesión</NavLink></li>
                <li className="nav-item ms-lg-2"><Link className="btn btn-rose" to="/registro" onClick={cerrar}>Registrarse</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item"><span className="nav-link saludo">Hola, {sesion.nombre.split(" ")[0]}</span></li>
                <li className="nav-item ms-lg-2"><button className="btn btn-outline-rose" onClick={salir}>Cerrar sesión</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
