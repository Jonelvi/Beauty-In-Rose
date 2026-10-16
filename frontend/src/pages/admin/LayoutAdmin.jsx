import { NavLink, Outlet } from "react-router-dom";
import EncabezadoPagina from "../../components/EncabezadoPagina";

function LayoutAdmin() {
  return (
    <>
      <EncabezadoPagina titulo="Panel de Administración" subtitulo="Gestiona productos, usuarios y pedidos de la tienda." />
      <div className="container pb-5">
      <ul className="nav nav-pills mb-4 flex-wrap gap-2">
        <li className="nav-item"><NavLink end className="nav-link pill-rose" to="/admin">Resumen</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link pill-rose" to="/admin/productos">Productos</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link pill-rose" to="/admin/usuarios">Usuarios y vendedores</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link pill-rose" to="/admin/pedidos">Pedidos</NavLink></li>
      </ul>
      <Outlet />
      </div>
    </>
  );
}

export default LayoutAdmin;
