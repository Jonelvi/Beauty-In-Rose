import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import EncabezadoPagina from "../components/EncabezadoPagina";
import { useCarrito } from "../context/CarritoContext";
import { useSesion } from "../context/SesionContext";
import { useTienda } from "../context/TiendaContext";
import { formatearPrecio } from "../utils/formato";
import {
  validarCorreoPermitido,
  validarNombre,
  validarTarjeta,
  validarTelefono,
} from "../utils/validaciones";

const COSTO_DESPACHO = 3000;

function Checkout() {
  const { items, total, vaciar } = useCarrito();
  const { sesion } = useSesion();
  const { registrarPedido } = useTienda();
  const navigate = useNavigate();

  // Si el usuario inició sesión, sus datos se cargan solos
  const [datos, setDatos] = useState({
    nombre: sesion ? sesion.nombre : "",
    correo: sesion ? sesion.correo : "",
    telefono: sesion ? sesion.telefono : "",
    direccion: "",
    comuna: "",
    ciudad: "",
    entrega: "despacho",
    metodoPago: "tarjeta",
    tarjeta: "",
  });
  const [errores, setErrores] = useState({});

  function cambiar(campo, valor) {
    setDatos({ ...datos, [campo]: valor });
  }

  function validar() {
    const nuevos = {};
    nuevos.nombre = validarNombre(datos.nombre);
    nuevos.correo = validarCorreoPermitido(datos.correo);
    nuevos.telefono = validarTelefono(datos.telefono);
    if (datos.entrega === "despacho") {
      nuevos.direccion = datos.direccion.trim().length < 5 ? "Ingresa tu dirección de envío." : "";
      nuevos.comuna = datos.comuna.trim() === "" ? "Completa la comuna." : "";
      nuevos.ciudad = datos.ciudad.trim() === "" ? "Completa la ciudad." : "";
    }
    if (datos.metodoPago === "tarjeta") {
      nuevos.tarjeta = validarTarjeta(datos.tarjeta);
    }
    setErrores(nuevos);
    return Object.values(nuevos).every((error) => error === "");
  }

  function pagar(evento) {
    evento.preventDefault();
    if (!validar()) {
      return;
    }

    // Simulación: las tarjetas terminadas en 0000 son rechazadas
    const soloDigitos = datos.tarjeta.split(" ").join("");
    if (datos.metodoPago === "tarjeta" && soloDigitos.endsWith("0000")) {
      navigate("/compra-fallida", { state: { motivo: "La tarjeta fue rechazada por el banco." } });
      return;
    }

    const envio = datos.entrega === "despacho" ? COSTO_DESPACHO : 0;
    const pedido = registrarPedido({
      cliente: datos.nombre,
      correo: datos.correo,
      direccion:
        datos.entrega === "despacho"
          ? datos.direccion + ", " + datos.comuna + ", " + datos.ciudad
          : "Retiro en tienda",
      metodoPago: datos.metodoPago,
      items: items,
      total: total + envio,
    });
    vaciar();
    navigate("/compra-exitosa", { state: { pedido: pedido } });
  }

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <p>Tu carrito está vacío. Agrega productos antes de continuar con la compra.</p>
        <Link to="/productos" className="btn btn-rose">Ver productos</Link>
      </div>
    );
  }

  const envio = datos.entrega === "despacho" ? COSTO_DESPACHO : 0;

  return (
    <>
      <EncabezadoPagina titulo="Finalizar compra" subtitulo="Completa tus datos para confirmar el pedido." />
      <div className="container pb-5">
      <form className="row g-4" onSubmit={pagar} noValidate>
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h5 mb-3">Datos del cliente</h2>
              <CampoFormulario id="nombre" etiqueta="Nombre completo" valor={datos.nombre} alCambiar={(v) => cambiar("nombre", v)} error={errores.nombre} autoComplete="name" />
              <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email" valor={datos.correo} alCambiar={(v) => cambiar("correo", v)} error={errores.correo} autoComplete="email" />
              <CampoFormulario id="telefono" etiqueta="Teléfono" tipo="tel" valor={datos.telefono} alCambiar={(v) => cambiar("telefono", v)} error={errores.telefono} autoComplete="tel" />
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h5 mb-3">Opciones de entrega</h2>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="despacho" name="entrega" checked={datos.entrega === "despacho"} onChange={() => cambiar("entrega", "despacho")} />
                <label className="form-check-label" htmlFor="despacho">Despacho a domicilio ({formatearPrecio(COSTO_DESPACHO)})</label>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="radio" id="retiro" name="entrega" checked={datos.entrega === "retiro"} onChange={() => cambiar("entrega", "retiro")} />
                <label className="form-check-label" htmlFor="retiro">Retiro en tienda (gratis)</label>
              </div>
              {datos.entrega === "despacho" && (
                <>
                  <CampoFormulario id="direccion" etiqueta="Dirección" valor={datos.direccion} alCambiar={(v) => cambiar("direccion", v)} error={errores.direccion} autoComplete="street-address" />
                  <div className="row">
                    <div className="col-6"><CampoFormulario id="comuna" etiqueta="Comuna" valor={datos.comuna} alCambiar={(v) => cambiar("comuna", v)} error={errores.comuna} /></div>
                    <div className="col-6"><CampoFormulario id="ciudad" etiqueta="Ciudad" valor={datos.ciudad} alCambiar={(v) => cambiar("ciudad", v)} error={errores.ciudad} /></div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5 mb-3">Método de pago</h2>
              <div className="form-check">
                <input className="form-check-input" type="radio" id="pagoTarjeta" name="metodoPago" checked={datos.metodoPago === "tarjeta"} onChange={() => cambiar("metodoPago", "tarjeta")} />
                <label className="form-check-label" htmlFor="pagoTarjeta">Tarjeta de crédito o débito</label>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="radio" id="pagoEfectivo" name="metodoPago" checked={datos.metodoPago === "efectivo"} onChange={() => cambiar("metodoPago", "efectivo")} />
                <label className="form-check-label" htmlFor="pagoEfectivo">Efectivo contra entrega</label>
              </div>
              {datos.metodoPago === "tarjeta" && (
                <>
                  <CampoFormulario id="tarjeta" etiqueta="Número de tarjeta" valor={datos.tarjeta} alCambiar={(v) => cambiar("tarjeta", v)} error={errores.tarjeta} placeholder="0000 0000 0000 0000" autoComplete="cc-number" />
                  <p className="small text-muted mb-0">
                    Simulación educativa, no se procesa ningún cobro real. Las tarjetas que terminan en 0000 se rechazan.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm resumen-sticky">
            <div className="card-body p-4">
              <h2 className="h5">Resumen del pedido</h2>
              <ul className="list-unstyled">
                {items.map((item) => (
                  <li key={item.id} className="d-flex justify-content-between">
                    <span>{item.nombre} × {item.cantidad}</span>
                    <span>{formatearPrecio(item.precio * item.cantidad)}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <p className="d-flex justify-content-between mb-1"><span>Subtotal</span><span>{formatearPrecio(total)}</span></p>
              <p className="d-flex justify-content-between mb-1"><span>Envío</span><span>{formatearPrecio(envio)}</span></p>
              <p className="d-flex justify-content-between fw-bold fs-5"><span>Total</span><span>{formatearPrecio(total + envio)}</span></p>
              <button type="submit" className="btn btn-rose w-100">Confirmar pedido</button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </>
  );
}

export default Checkout;
