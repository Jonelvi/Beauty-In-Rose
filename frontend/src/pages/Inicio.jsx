import { useState } from "react";
import { Link } from "react-router-dom";
import ListaProductos from "../components/ListaProductos";
import { useCarrito } from "../context/CarritoContext";
import { useTienda } from "../context/TiendaContext";
import { validarCorreo } from "../utils/validaciones";

const beneficios = [
  { icono: "🚚", titulo: "Envío a todo Chile", texto: "Despacho a domicilio o retiro en tienda" },
  { icono: "🔒", titulo: "Compra segura", texto: "Tus datos siempre protegidos" },
  { icono: "🌹", titulo: "Calidad garantizada", texto: "Productos probados y seleccionados" },
  { icono: "💬", titulo: "Atención cercana", texto: "Te ayudamos con tu rutina" },
];

function Inicio() {
  const { productos } = useTienda();
  const { agregar } = useCarrito();
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  const destacados = productos.slice(0, 4);
  const ofertas = productos.filter((p) => p.precioOferta).slice(0, 4);
  const popular = productos[0];

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
      <section className="hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <span className="hero-etiqueta">✨ Belleza natural, cuidado real</span>
              <h1>Realza tu belleza natural</h1>
              <p className="lead mb-4">
                Descubre nuestra colección de cosméticos y cuidado de la piel pensada para ti.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link to="/productos" className="btn btn-rose btn-lg">Ver productos</Link>
                <Link to="/ofertas" className="btn btn-outline-rose btn-lg">Ver ofertas</Link>
              </div>
            </div>
            <div className="col-12 col-lg-6 text-center">
              {popular && (
                <Link
                  to={"/producto/" + popular.id}
                  className="hero-imagen d-inline-block position-relative"
                >
                  <img src={popular.imagen} alt={popular.nombre + ", nuestro producto más popular"} />
                  <span className="etiqueta-popular">⭐ Producto más popular</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container beneficios">
        <div className="row g-3">
          {beneficios.map((beneficio) => (
            <div className="col-12 col-sm-6 col-lg-3" key={beneficio.titulo}>
              <div className="beneficio">
                <div className="beneficio-icono">{beneficio.icono}</div>
                <div>
                  <strong>{beneficio.titulo}</strong>
                  <span>{beneficio.texto}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container seccion">
        <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-4">
          <h2 className="titulo-seccion mb-0">Productos destacados</h2>
          <Link to="/productos" className="fw-bold">Ver todos &rarr;</Link>
        </div>
        <ListaProductos productos={destacados} alAgregar={agregar} />
      </section>

      <section className="seccion seccion-rosa">
        <div className="container text-center">
          <h2 className="titulo-seccion">Aprende a maquillarte con nosotros</h2>
          <p className="mb-4">Un tutorial rápido para lucir un maquillaje natural en el día a día.</p>
          <div className="ratio ratio-16x9 video-maquillaje">
            <iframe
              src="https://www.youtube.com/embed/ANPRpOcAf44"
              title="Tutorial de maquillaje natural en español"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="container seccion">
        <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-2">
          <h2 className="titulo-seccion mb-0">Ofertas del día</h2>
          <Link to="/ofertas" className="fw-bold">Ver todas las ofertas &rarr;</Link>
        </div>
        <p className="mb-4">¡Solo por hoy! Aprovecha estos descuentos antes de que se acaben.</p>
        <ListaProductos productos={ofertas} alAgregar={agregar} />
      </section>

      <section className="container pb-5">
        <div className="card tarjeta-rosa text-center p-4 p-md-5">
          <h2 className="titulo-seccion">Únete a nuestro club de belleza</h2>
          <p>Recibe descuentos exclusivos y novedades en tu correo.</p>
          <form className="row g-2 justify-content-center" onSubmit={suscribirse} noValidate>
            <div className="col-12 col-md-6">
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
            <p className={"mt-3 mb-0 fw-semibold " + (esError ? "text-danger" : "text-success")} role="alert">
              {mensaje}
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Inicio;
