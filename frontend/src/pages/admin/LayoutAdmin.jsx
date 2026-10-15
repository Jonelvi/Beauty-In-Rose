import { NavLink, Outlet } from "react-router-dom";

function LayoutAdmin() {
  return (
    <div className="container py-4">
      <h1 className="titulo-seccion">Panel de Administración</h1>
      <ul className="nav nav-pills mb-4 flex-wrap gap-2">
        <li className="nav-item"><NavLink end className="nav-link pill-rose" to="/admin">Resumen</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link pill-rose" to="/admin/productos">Productos</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link pill-rose" to="/admin/usuarios">Usuarios y vendedores</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link pill-rose" to="/admin/pedidos">Pedidos</NavLink></li>
      </ul>
      <Outlet />
    </div>
  );
}

export default LayoutAdmin;
