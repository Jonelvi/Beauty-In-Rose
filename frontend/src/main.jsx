import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./estilos.css";
import "./tema-halloween.css";
import App from "./App";
import { CarritoProvider } from "./context/CarritoContext";
import { SesionProvider } from "./context/SesionContext";
import { TiendaProvider } from "./context/TiendaContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SesionProvider>
        <TiendaProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </TiendaProvider>
      </SesionProvider>
    </BrowserRouter>
  </StrictMode>
);
