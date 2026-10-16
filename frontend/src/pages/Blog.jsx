import { Link } from "react-router-dom";
import EncabezadoPagina from "../components/EncabezadoPagina";
import { articulosBlog } from "../data/articulosBlog";

function Blog() {
  return (
    <>
      <EncabezadoPagina titulo="Blog de Belleza" subtitulo="Tips, tendencias y consejos para tu rutina de maquillaje y cuidado de la piel." />
      <div className="container pb-5">
      <div className="row g-4">
        {articulosBlog.map((articulo) => (
          <div className="col-12 col-md-6 col-lg-3" key={articulo.id}>
            <article className="card h-100 shadow-sm overflow-hidden">
              <div className="portada-blog">{articulo.icono}</div>
              <div className="card-body d-flex flex-column">
                <p className="small fecha-blog mb-1">{articulo.fecha}</p>
                <h2 className="h5">{articulo.titulo}</h2>
                <p className="flex-grow-1">{articulo.resumen}</p>
                <Link to={"/blog/" + articulo.id}>Leer más &rarr;</Link>
              </div>
            </article>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default Blog;
