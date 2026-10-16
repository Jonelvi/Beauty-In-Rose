import { useTienda } from "../../context/TiendaContext";
import { formatearPrecio } from "../../utils/formato";

function ResumenAdmin() {
  const { productos, usuarios, pedidos } = useTienda();
  const ventas = pedidos.reduce((suma, p) => suma + p.total, 0);
  const sinStock = productos.filter((p) => p.stock <= 0).length;

  const tarjetas = [
    { titulo: "Productos", valor: productos.length },
    { titulo: "Usuarios", valor: usuarios.length },
    { titulo: "Pedidos", valor: pedidos.length },
    { titulo: "Ventas totales", valor: formatearPrecio(ventas) },
    { titulo: "Productos sin stock", valor: sinStock },
  ];

  return (
    <div className="row g-4">
      {tarjetas.map((tarjeta) => (
        <div className="col-6 col-lg-4" key={tarjeta.titulo}>
          <div className="card shadow-sm text-center h-100 tarjeta-metrica">
            <div className="card-body">
              <p className="mb-1">{tarjeta.titulo}</p>
              <p className="display-6 mb-0 valor-resumen">{tarjeta.valor}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResumenAdmin;
