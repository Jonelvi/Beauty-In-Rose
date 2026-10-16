import { Link } from "react-router-dom";
import EncabezadoPagina from "../components/EncabezadoPagina";
import { useTienda } from "../context/TiendaContext";
import { obtenerCategorias } from "../utils/filtros";

function Categorias() {
  const { productos } = useTienda();
  const categorias = obtenerCategorias(productos);

  return (
    <>
      <EncabezadoPagina titulo="Categorías" subtitulo="Explora nuestros productos según lo que estés buscando." />
      <div className="container pb-5">

      <div className="row g-4">
        {categorias.map((categoria) => {
          const delaCategoria = productos.filter((p) => p.categoria === categoria);
          return (
            <div className="col-12 col-md-6" key={categoria}>
              <Link
                to={"/productos?categoria=" + encodeURIComponent(categoria)}
                className="card categoria-card h-100 text-decoration-none"
              >
                <img src={delaCategoria[0].imagen} className="card-img-top" alt={categoria} />
                <div className="card-body text-center">
                  <h2 className="h4">{categoria}</h2>
                  <p className="mb-0">{delaCategoria.length} producto(s)</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
}

export default Categorias;
