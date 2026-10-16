import ListaProductos from "../components/ListaProductos";
import EncabezadoPagina from "../components/EncabezadoPagina";
import { useCarrito } from "../context/CarritoContext";
import { useTienda } from "../context/TiendaContext";

function Ofertas() {
  const { productos } = useTienda();
  const { agregar } = useCarrito();
  const ofertas = productos.filter((p) => p.precioOferta);

  return (
    <>
      <EncabezadoPagina titulo="Ofertas" subtitulo="Todos los productos con descuento. ¡Aprovecha antes de que se acaben!" />
      <div className="container pb-5">
        <ListaProductos productos={ofertas} alAgregar={agregar} />
      </div>
    </>
  );
}

export default Ofertas;
