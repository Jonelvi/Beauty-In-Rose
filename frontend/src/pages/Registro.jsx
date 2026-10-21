import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { useSesion } from "../context/SesionContext";
import { useTienda } from "../context/TiendaContext";
import { validarCorreoPermitido, validarNombre, validarPassword } from "../utils/validaciones";

function Registro() {
  const { registrarse } = useSesion();
  const { refrescarUsuarios } = useTienda();
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    password: "",
    confirmar: "",
    terminos: false,
  });
  const [errores, setErrores] = useState({});

  function cambiar(campo, valor) {
    setDatos({ ...datos, [campo]: valor });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = {
      nombre: validarNombre(datos.nombre),
      correo: validarCorreoPermitido(datos.correo),
      password: validarPassword(datos.password),
      confirmar: datos.password !== datos.confirmar ? "Las contraseñas no coinciden." : "",
      terminos: datos.terminos ? "" : "Debes aceptar los términos y condiciones.",
    };

    if (Object.values(nuevos).some((e) => e !== "")) {
      setErrores(nuevos);
      return;
    }

    const usuario = registrarse({
      nombre: datos.nombre,
      correo: datos.correo,
      telefono: datos.telefono,
      password: datos.password,
      rol: "cliente",
    });

    if (usuario === null) {
      setErrores({ ...nuevos, correo: "Ese correo ya está registrado. Intenta iniciar sesión." });
      return;
    }

    refrescarUsuarios();
    navigate("/");
  }

  return (
    <div className="pagina-auth py-5">
      <div className="container">
      <div className="card mx-auto shadow tarjeta-auth">
        <div className="card-body p-4">
          <h1 className="h2 text-center">Crea tu cuenta</h1>
          <p className="text-center">Regístrate para guardar tus datos y agilizar tus compras.</p>
          <form onSubmit={enviar} noValidate>
            <CampoFormulario id="nombreRegistro" etiqueta="Nombre completo" valor={datos.nombre} alCambiar={(v) => cambiar("nombre", v)} error={errores.nombre} autoComplete="name" />
            <CampoFormulario id="correoRegistro" etiqueta="Correo electrónico" tipo="email" valor={datos.correo} alCambiar={(v) => cambiar("correo", v)} error={errores.correo} autoComplete="email" />
            <CampoFormulario id="telefonoRegistro" etiqueta="Teléfono (opcional)" tipo="tel" valor={datos.telefono} alCambiar={(v) => cambiar("telefono", v)} autoComplete="tel" />
            <CampoFormulario id="passwordRegistro" etiqueta="Contraseña" tipo="password" valor={datos.password} alCambiar={(v) => cambiar("password", v)} error={errores.password} placeholder="Mínimo 8 caracteres, con mayúscula y número" autoComplete="new-password" />
            <CampoFormulario id="confirmarRegistro" etiqueta="Confirmar contraseña" tipo="password" valor={datos.confirmar} alCambiar={(v) => cambiar("confirmar", v)} error={errores.confirmar} autoComplete="new-password" />

            <div className="form-check mb-3">
              <input
                id="terminos"
                type="checkbox"
                className="form-check-input"
                checked={datos.terminos}
                onChange={(e) => cambiar("terminos", e.target.checked)}
              />
              <label htmlFor="terminos" className="form-check-label">Acepto los términos y condiciones</label>
              {errores.terminos && <div className="text-danger small" role="alert">{errores.terminos}</div>}
            </div>

            <button type="submit" className="btn btn-rose w-100">Crear cuenta</button>
          </form>
          <p className="text-center mt-3 mb-0">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Registro;
