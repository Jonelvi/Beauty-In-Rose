// Funciones de apoyo para las pruebas: montar componentes en el DOM y
// simular lo que hace el usuario (clics y escritura).
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { CarritoProvider } from "../context/CarritoContext";
import { SesionProvider } from "../context/SesionContext";
import { TiendaProvider } from "../context/TiendaContext";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const montados = [];

// Dibuja un componente y devuelve el contenedor del DOM
export function renderizar(elemento) {
  const contenedor = document.createElement("div");
  document.body.appendChild(contenedor);
  const raiz = createRoot(contenedor);
  act(() => {
    raiz.render(elemento);
  });
  montados.push({ raiz, contenedor });
  return contenedor;
}

// Dibuja un componente dentro de todos los providers y del router
export function renderizarConApp(elemento, ruta = "/") {
  return renderizar(
    <MemoryRouter initialEntries={[ruta]}>
      <SesionProvider>
        <TiendaProvider>
          <CarritoProvider>{elemento}</CarritoProvider>
        </TiendaProvider>
      </SesionProvider>
    </MemoryRouter>
  );
}

// Limpia todos los componentes que se montaron en la prueba
export function limpiarDOM() {
  while (montados.length > 0) {
    const { raiz, contenedor } = montados.pop();
    act(() => {
      raiz.unmount();
    });
    contenedor.remove();
  }
}

export function clic(elemento) {
  act(() => {
    elemento.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

// Escribe en un input/textarea como lo haría una persona
export function escribir(elemento, texto) {
  const prototipo =
    elemento.tagName === "TEXTAREA"
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
  const asignar = Object.getOwnPropertyDescriptor(prototipo, "value").set;
  act(() => {
    asignar.call(elemento, texto);
    elemento.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

export function elegirOpcion(select, valor) {
  const asignar = Object.getOwnPropertyDescriptor(
    window.HTMLSelectElement.prototype,
    "value"
  ).set;
  act(() => {
    asignar.call(select, valor);
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

export function enviarFormulario(formulario) {
  act(() => {
    formulario.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}

export function limpiarStorage() {
  localStorage.clear();
}
