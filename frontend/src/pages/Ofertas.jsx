import ListaProductos from "../components/ListaProductos";
import { useCarrito } from "../context/CarritoContext";
import { useTienda } from "../context/TiendaContext";

function Ofertas() {
  const { productos } = useTienda();
  const { agregar } = useCarrito();
  const ofertas = productos.filter((p) => p.precioOferta);

  return (
    <div className="container py-4">
      <h1 className="titulo-seccion">Ofertas</h1>
      <p>Todos los productos con descuento. ¡Aprovecha antes de que se acaben!</p>
      <ListaProductos productos={ofertas} alAgregar={agregar} />
    </div>
  );
}

export default Ofertas;
