import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { useSesion } from "../context/SesionContext";
import { validarCorreo } from "../utils/validaciones";

function Login() {
  const { iniciarSesion } = useSesion();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = {
      correo: validarCorreo(correo),
      password: password.trim() === "" ? "Ingresa tu contraseña." : "",
    };
    setErrores(nuevos);
    setErrorGeneral("");
    if (nuevos.correo !== "" || nuevos.password !== "") {
      return;
    }

    if (!iniciarSesion(correo, password)) {
      setErrorGeneral("Correo o contraseña incorrectos.");
      return;
    }
    navigate("/");
  }

  return (
    <div className="pagina-auth py-5">
      <div className="container">
      <div className="card mx-auto shadow tarjeta-auth">
        <div className="card-body p-4">
          <h1 className="h2 text-center">Inicia sesión</h1>
          <p className="text-center">Ingresa con tu cuenta de Beauty in Rose.</p>
          <form onSubmit={enviar} noValidate>
            <CampoFormulario id="correoLogin" etiqueta="Correo electrónico" tipo="email" valor={correo} alCambiar={setCorreo} error={errores.correo} autoComplete="email" />
            <CampoFormulario id="passwordLogin" etiqueta="Contraseña" tipo="password" valor={password} alCambiar={setPassword} error={errores.password} autoComplete="current-password" />
            <button type="submit" className="btn btn-rose w-100">Iniciar sesión</button>
            {errorGeneral && <p className="text-danger mt-3 mb-0" role="alert">{errorGeneral}</p>}
          </form>
          <p className="text-center mt-3 mb-0">
            ¿Aún no tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
