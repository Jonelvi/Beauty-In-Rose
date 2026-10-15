import { useState } from "react";
import { Link } from "react-router-dom";
import ListaProductos from "../components/ListaProductos";
import { useCarrito } from "../context/CarritoContext";
import { useTienda } from "../context/TiendaContext";
import { validarCorreo } from "../utils/validaciones";

function Inicio() {
  const { productos } = useTienda();
  const { agregar } = useCarrito();
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  const destacados = productos.slice(0, 4);
  const ofertas = productos.filter((p) => p.precioOferta).slice(0, 4);
  const populares = productos[0];

  function suscribirse(evento) {
    evento.preventDefault();
    const error = validarCorreo(correo);
    if (error !== "") {
      setMensaje(error);
      setEsError(true);
      return;
    }
    setMensaje("¡Gracias por suscribirte a Beauty in Rose!");
    setEsError(false);
    setCorreo("");
  }

  return (
    <>
      <section className="container hero py-5">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6 text-center text-md-start">
            <h1 className="display-5 fw-bold">Realza tu belleza natural</h1>
            <p className="lead">
              Descubre nuestra colección de cosméticos y cuidado de la piel pensada para ti.
            </p>
            <Link to="/productos" className="btn btn-rose btn-lg">Ver productos</Link>
          </div>
          <div className="col-12 col-md-6 text-center">
            {populares && (
              <Link to={"/producto/" + populares.id} className="hero-imagen d-inline-block position-relative">
                <img src={populares.imagen} alt={populares.nombre + ", nuestro producto más popular"} />
                <span className="etiqueta-popular">⭐ Producto más popular</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="container py-4">
        <h2 className="titulo-seccion">Productos destacados</h2>
        <ListaProductos productos={destacados} alAgregar={agregar} />
      </section>

      <section className="seccion-rosa py-5 my-4">
        <div className="container text-center">
          <h2 className="titulo-seccion">Aprende a maquillarte con nosotros</h2>
          <p>Un tutorial rápido para lucir un maquillaje natural en el día a día.</p>
          <div className="ratio ratio-16x9 video-maquillaje">
            <iframe
              src="https://www.youtube.com/embed/ANPRpOcAf44"
              title="Tutorial de maquillaje natural en español"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h2 className="titulo-seccion mb-0">Ofertas del día</h2>
          <Link to="/ofertas">Ver todas las ofertas</Link>
        </div>
        <p className="mt-2">¡Solo por hoy! Aprovecha estos descuentos antes de que se acaben.</p>
        <ListaProductos productos={ofertas} alAgregar={agregar} />
      </section>

      <section className="container py-5 text-center">
        <h2 className="titulo-seccion">Únete a nuestro club de belleza</h2>
        <p>Recibe descuentos exclusivos y novedades en tu correo.</p>
        <form className="row g-2 justify-content-center" onSubmit={suscribirse} noValidate>
          <div className="col-12 col-md-5">
            <label htmlFor="correoNewsletter" className="visually-hidden">Correo electrónico</label>
            <input
              id="correoNewsletter"
              type="email"
              className="form-control"
              placeholder="Ingresa tu correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-auto">
            <button type="submit" className="btn btn-rose">Suscribirme</button>
          </div>
        </form>
        {mensaje && (
          <p className={"mt-3 " + (esError ? "text-danger" : "text-success")} role="alert">{mensaje}</p>
        )}
      </section>
    </>
  );
}

export default Inicio;
