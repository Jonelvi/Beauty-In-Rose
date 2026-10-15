import { useTienda } from "../../context/TiendaContext";
import { formatearPrecio } from "../../utils/formato";

const estados = ["Pagado", "En preparación", "Enviado", "Entregado", "Cancelado"];

function AdminPedidos() {
  const { pedidos, editarPedido, borrarPedido } = useTienda();

  if (pedidos.length === 0) {
    return <p className="mensaje-vacio">Todavía no hay pedidos registrados.</p>;
  }

  return (
    <div className="table-responsive card shadow-sm">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.fecha}</td>
              <td>{p.cliente}</td>
              <td>{formatearPrecio(p.total)}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  aria-label={"Estado del pedido " + p.id}
                  value={p.estado}
                  onChange={(e) => editarPedido(p.id, { estado: e.target.value })}
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="btn btn-sm btn-outline-danger" onClick={() => borrarPedido(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPedidos;
