import { Link, useParams } from "react-router-dom";
import { articulosBlog } from "../data/articulosBlog";

function BlogPost() {
  const { id } = useParams();
  const articulo = articulosBlog.find((a) => a.id === id);

  if (!articulo) {
    return (
      <div className="container py-5 text-center">
        <p>No encontramos ese artículo.</p>
        <Link to="/blog" className="btn btn-rose">Ver todo el blog</Link>
      </div>
    );
  }

  return (
    <div className="container py-4 articulo">
      <Link to="/blog" className="d-inline-block mb-3">&larr; Volver al blog</Link>
      <div className="portada-blog portada-grande">{articulo.icono}</div>
      <p className="small fecha-blog mt-3 mb-1">{articulo.fecha}</p>
      <h1>{articulo.titulo}</h1>
      {articulo.contenido.map((parrafo, indice) => (
        <p key={indice}>{parrafo}</p>
      ))}
    </div>
  );
}

export default BlogPost;
