// Pruebas de componentes: renderizado, props, estado y eventos.
import { MemoryRouter } from "react-router-dom";
import BarraBusqueda from "../components/BarraBusqueda";
import CampoFormulario from "../components/CampoFormulario";
import FiltroCategorias from "../components/FiltroCategorias";
import ItemCarrito from "../components/ItemCarrito";
import ListaProductos from "../components/ListaProductos";
import TarjetaProducto from "../components/TarjetaProducto";
import { clic, escribir, limpiarDOM, renderizar } from "./ayudas";

const producto = {
  id: "labial-prueba",
  nombre: "Labial de Prueba",
  descripcion: "Descripción larga del producto de prueba para el catálogo.",
  precio: 10000,
  precioOferta: null,
  stock: 5,
  imagen: "/img/logo.svg",
  categoria: "Maquillaje",
};

function conRouter(elemento) {
  return <MemoryRouter>{elemento}</MemoryRouter>;
}

describe("TarjetaProducto", () => {
  afterEach(limpiarDOM);

  it("renderiza el nombre y el precio del producto", () => {
    const contenedor = renderizar(conRouter(<TarjetaProducto producto={producto} alAgregar={() => {}} />));
    expect(contenedor.textContent).toContain("Labial de Prueba");
    expect(contenedor.textContent).toContain("$10.000");
  });

  it("muestra la etiqueta de descuento solo cuando está en oferta", () => {
    const enOferta = { ...producto, precioOferta: 8000 };
    const contenedor = renderizar(conRouter(<TarjetaProducto producto={enOferta} alAgregar={() => {}} />));
    expect(contenedor.textContent).toContain("-20%");

    const otro = renderizar(conRouter(<TarjetaProducto producto={producto} alAgregar={() => {}} />));
    expect(otro.textContent).not.toContain("-20%");
  });

  it("llama a alAgregar con el producto al presionar el botón (mock)", () => {
    const alAgregar = jasmine.createSpy("alAgregar");
    const contenedor = renderizar(conRouter(<TarjetaProducto producto={producto} alAgregar={alAgregar} />));
    clic(contenedor.querySelector("button"));
    expect(alAgregar).toHaveBeenCalledTimes(1);
    expect(alAgregar).toHaveBeenCalledWith(producto);
  });

  it("deshabilita el botón cuando no hay stock", () => {
    const sinStock = { ...producto, stock: 0 };
    const contenedor = renderizar(conRouter(<TarjetaProducto producto={sinStock} alAgregar={() => {}} />));
    const boton = contenedor.querySelector("button");
    expect(boton.disabled).toBeTrue();
    expect(boton.textContent).toBe("Sin stock");
  });
});

describe("ListaProductos", () => {
  afterEach(limpiarDOM);

  it("renderiza una tarjeta por cada producto", () => {
    const lista = [producto, { ...producto, id: "otro", nombre: "Otro producto" }];
    const contenedor = renderizar(conRouter(<ListaProductos productos={lista} alAgregar={() => {}} />));
    expect(contenedor.querySelectorAll("article").length).toBe(2);
  });

  it("muestra un mensaje cuando no hay productos", () => {
    const contenedor = renderizar(conRouter(<ListaProductos productos={[]} alAgregar={() => {}} />));
    expect(contenedor.textContent).toContain("No encontramos productos");
    expect(contenedor.querySelectorAll("article").length).toBe(0);
  });
});

describe("BarraBusqueda", () => {
  afterEach(limpiarDOM);

  it("muestra el valor recibido por props", () => {
    const contenedor = renderizar(<BarraBusqueda valor="labial" alCambiar={() => {}} />);
    expect(contenedor.querySelector("input").value).toBe("labial");
  });

  it("avisa el texto escrito mediante alCambiar", () => {
    const alCambiar = jasmine.createSpy("alCambiar");
    const contenedor = renderizar(<BarraBusqueda valor="" alCambiar={alCambiar} />);
    escribir(contenedor.querySelector("input"), "rubor");
    expect(alCambiar).toHaveBeenCalledWith("rubor");
  });
});

describe("FiltroCategorias", () => {
  afterEach(limpiarDOM);

  it("renderiza la opción Todas y las categorías recibidas", () => {
    const contenedor = renderizar(
      <FiltroCategorias categorias={["Maquillaje", "Cuidado de la piel"]} seleccionada="Todas" alSeleccionar={() => {}} />
    );
    expect(contenedor.querySelectorAll("button").length).toBe(3);
  });

  it("marca como activa la categoría seleccionada", () => {
    const contenedor = renderizar(
      <FiltroCategorias categorias={["Maquillaje"]} seleccionada="Maquillaje" alSeleccionar={() => {}} />
    );
    const botones = contenedor.querySelectorAll("button");
    expect(botones[1].className).toContain("btn-rose");
    expect(botones[0].className).toContain("btn-outline-rose");
  });

  it("llama a alSeleccionar al hacer clic en una categoría", () => {
    const alSeleccionar = jasmine.createSpy("alSeleccionar");
    const contenedor = renderizar(
      <FiltroCategorias categorias={["Maquillaje"]} seleccionada="Todas" alSeleccionar={alSeleccionar} />
    );
    clic(contenedor.querySelectorAll("button")[1]);
    expect(alSeleccionar).toHaveBeenCalledWith("Maquillaje");
  });
});

describe("CampoFormulario", () => {
  afterEach(limpiarDOM);

  it("muestra el mensaje de error solo cuando existe un error", () => {
    const conError = renderizar(
      <CampoFormulario id="a" etiqueta="Correo" valor="" alCambiar={() => {}} error="Correo inválido" />
    );
    expect(conError.textContent).toContain("Correo inválido");

    const sinError = renderizar(<CampoFormulario id="b" etiqueta="Correo" valor="" alCambiar={() => {}} />);
    expect(sinError.querySelector("[role='alert']")).toBeNull();
  });

  it("asocia la etiqueta con el input", () => {
    const contenedor = renderizar(<CampoFormulario id="nombre" etiqueta="Nombre" valor="" alCambiar={() => {}} />);
    expect(contenedor.querySelector("label").getAttribute("for")).toBe("nombre");
    expect(contenedor.querySelector("input").id).toBe("nombre");
  });
});

describe("ItemCarrito", () => {
  afterEach(limpiarDOM);

  const item = { id: "x", nombre: "Rubor", precio: 5000, imagen: "/img/logo.svg", cantidad: 2 };

  it("muestra la cantidad y el subtotal", () => {
    const contenedor = renderizar(<ItemCarrito item={item} alCambiarCantidad={() => {}} alQuitar={() => {}} />);
    expect(contenedor.textContent).toContain("2");
    expect(contenedor.textContent).toContain("$10.000");
  });

  it("los botones + y − llaman a alCambiarCantidad", () => {
    const alCambiarCantidad = jasmine.createSpy("alCambiarCantidad");
    const contenedor = renderizar(<ItemCarrito item={item} alCambiarCantidad={alCambiarCantidad} alQuitar={() => {}} />);
    clic(contenedor.querySelector("[aria-label='Agregar una unidad']"));
    clic(contenedor.querySelector("[aria-label='Quitar una unidad']"));
    expect(alCambiarCantidad).toHaveBeenCalledWith("x", 1);
    expect(alCambiarCantidad).toHaveBeenCalledWith("x", -1);
  });

  it("el botón de basurero llama a alQuitar con el id", () => {
    const alQuitar = jasmine.createSpy("alQuitar");
    const contenedor = renderizar(<ItemCarrito item={item} alCambiarCantidad={() => {}} alQuitar={alQuitar} />);
    clic(contenedor.querySelector("[aria-label^='Eliminar']"));
    expect(alQuitar).toHaveBeenCalledWith("x");
  });
});
