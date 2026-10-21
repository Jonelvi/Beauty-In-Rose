import { useState } from "react";
import CampoFormulario from "../components/CampoFormulario";
import EncabezadoPagina from "../components/EncabezadoPagina";
import { validarCorreoPermitido, validarMensaje, validarNombre } from "../utils/validaciones";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = {
      nombre: validarNombre(nombre),
      correo: validarCorreoPermitido(correo),
      asunto: asunto === "" ? "Selecciona un asunto para tu mensaje." : "",
      mensaje: validarMensaje(mensaje),
    };
    setErrores(nuevos);
    setEnviado(false);

    if (Object.values(nuevos).every((e) => e === "")) {
      setEnviado(true);
      setNombre("");
      setCorreo("");
      setAsunto("");
      setMensaje("");
    }
  }

  return (
    <>
      <EncabezadoPagina titulo="Contáctanos" subtitulo="¿Tienes dudas o sugerencias? Escríbenos, con gusto te ayudamos." />
      <div className="container pb-5">
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <form className="card shadow-sm" onSubmit={enviar} noValidate>
            <div className="card-body">
              <h2 className="h4 mb-3">Envíanos un mensaje</h2>
              <CampoFormulario id="nombreContacto" etiqueta="Nombre completo" valor={nombre} alCambiar={setNombre} error={errores.nombre} autoComplete="name" />
              <CampoFormulario id="correoContacto" etiqueta="Correo electrónico" tipo="email" valor={correo} alCambiar={setCorreo} error={errores.correo} autoComplete="email" />

              <div className="mb-3">
                <label htmlFor="asuntoContacto" className="form-label fw-semibold">Asunto</label>
                <select
                  id="asuntoContacto"
                  className={"form-select" + (errores.asunto ? " is-invalid" : "")}
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta sobre productos</option>
                  <option value="pedido">Estado de mi pedido</option>
                  <option value="reclamo">Reclamo o devolución</option>
                  <option value="otro">Otro</option>
                </select>
                {errores.asunto && <div className="invalid-feedback d-block" role="alert">{errores.asunto}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="mensajeContacto" className="form-label fw-semibold">Mensaje</label>
                <textarea
                  id="mensajeContacto"
                  rows="5"
                  className={"form-control" + (errores.mensaje ? " is-invalid" : "")}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                ></textarea>
                {errores.mensaje && <div className="invalid-feedback d-block" role="alert">{errores.mensaje}</div>}
              </div>

              <button type="submit" className="btn btn-rose">Enviar mensaje</button>
              {enviado && (
                <p className="text-success mt-3 mb-0" role="status">
                  ¡Mensaje enviado! Te responderemos a la brevedad.
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h4">Información de contacto</h2>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><strong>Dirección:</strong> Av. Esquina Blanca 501</li>
                <li className="mb-2"><strong>Correo:</strong> camilavngs@gmail.com</li>
                <li className="mb-2"><strong>Teléfono:</strong> +56 9 6407 1426</li>
                <li><strong>Horario:</strong> Lunes a viernes, 9:00 a 18:00 hrs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Contacto;
