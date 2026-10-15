import { useEffect } from "react";
import { useTienda } from "../../context/TiendaContext";

function AdminUsuarios() {
  const { usuarios, editarUsuario, borrarUsuario, refrescarUsuarios } = useTienda();

  // Por si alguien se registró desde otra pestaña
  useEffect(() => {
    refrescarUsuarios();
  }, []);

  function eliminar(usuario) {
    if (window.confirm("¿Eliminar a " + usuario.nombre + "?")) {
      borrarUsuario(usuario.id);
    }
  }

  return (
    <div className="table-responsive card shadow-sm">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.telefono || "-"}</td>
              <td>
                {u.rol === "admin" ? (
                  <span className="badge bg-rose-dark">Administrador</span>
                ) : (
                  <select
                    className="form-select form-select-sm selector-rol"
                    aria-label={"Rol de " + u.nombre}
                    value={u.rol}
                    onChange={(e) => editarUsuario(u.id, { rol: e.target.value })}
                  >
                    <option value="cliente">Cliente</option>
                    <option value="vendedor">Vendedor</option>
                  </select>
                )}
              </td>
              <td>
                {u.rol !== "admin" && (
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(u)}>Eliminar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsuarios;
