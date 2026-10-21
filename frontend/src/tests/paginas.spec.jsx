// Pruebas de páginas completas: formularios, carrito, checkout y panel admin.
import { Route, Routes } from "react-router-dom";
import { crearPedido, crearUsuario, guardarCarritoEnStorage, guardarSesion } from "../data/baseDatos";
import RutaAdmin from "../components/RutaAdmin";
import Carrito from "../pages/Carrito";
import Checkout from "../pages/Checkout";
import CompraExitosa from "../pages/CompraExitosa";
import CompraFallida from "../pages/CompraFallida";
import Contacto from "../pages/Contacto";
import Login from "../pages/Login";
import Productos from "../pages/Productos";
import Registro from "../pages/Registro";
import AdminPedidos from "../pages/admin/AdminPedidos";
import AdminUsuarios from "../pages/admin/AdminUsuarios";
import AdminProductos from "../pages/admin/AdminProductos";
import {
  clic,
  elegirOpcion,
  enviarFormulario,
  escribir,
  limpiarDOM,
  limpiarStorage,
  renderizarConApp,
} from "./ayudas";

const itemCarrito = { id: "labial-mate-rose", nombre: "Labial Mate Rose", precio: 8990, imagen: "/img/logo.svg", cantidad: 1 };

describe("Contacto", () => {
  beforeEach(limpiarStorage);
  afterEach(limpiarDOM);

  it("muestra errores cuando se envía el formulario vacío", () => {
    const contenedor = renderizarConApp(<Contacto />);
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.textContent).toContain("Ingresa tu nombre completo");
    expect(contenedor.textContent).toContain("Ingresa un correo electrónico válido");
  });

  it("muestra el mensaje de éxito cuando los datos son válidos", () => {
    const contenedor = renderizarConApp(<Contacto />);
    escribir(contenedor.querySelector("#nombreContacto"), "Ana Pérez");
    escribir(contenedor.querySelector("#correoContacto"), "ana@gmail.com");
    elegirOpcion(contenedor.querySelector("#asuntoContacto"), "consulta");
    escribir(contenedor.querySelector("#mensajeContacto"), "Quisiera saber más de sus productos");
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.textContent).toContain("¡Mensaje enviado!");
  });
});

describe("Login", () => {
  beforeEach(limpiarStorage);
  afterEach(limpiarDOM);

  it("muestra un error con credenciales incorrectas", () => {
    const contenedor = renderizarConApp(<Login />);
    escribir(contenedor.querySelector("#correoLogin"), "admin@beautyinrose.cl");
    escribir(contenedor.querySelector("#passwordLogin"), "incorrecta");
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.textContent).toContain("Correo o contraseña incorrectos");
  });

  it("guarda la sesión cuando las credenciales son correctas", () => {
    const contenedor = renderizarConApp(<Login />);
    escribir(contenedor.querySelector("#correoLogin"), "admin@beautyinrose.cl");
    escribir(contenedor.querySelector("#passwordLogin"), "Admin1234");
    enviarFormulario(contenedor.querySelector("form"));
    const sesion = JSON.parse(localStorage.getItem("bir_sesion"));
    expect(sesion.rol).toBe("admin");
  });
});

describe("Productos", () => {
  beforeEach(limpiarStorage);
  afterEach(limpiarDOM);

  it("filtra la lista al escribir en el buscador", () => {
    const contenedor = renderizarConApp(<Productos />);
    const antes = contenedor.querySelectorAll("article").length;
    escribir(contenedor.querySelector("#busqueda"), "delineador");
    const despues = contenedor.querySelectorAll("article").length;
    expect(despues).toBe(1);
    expect(antes).toBeGreaterThan(despues);
  });

  it("muestra un mensaje cuando la búsqueda no tiene resultados", () => {
    const contenedor = renderizarConApp(<Productos />);
    escribir(contenedor.querySelector("#busqueda"), "zzzzzz");
    expect(contenedor.textContent).toContain("No encontramos productos");
  });
});

describe("Carrito", () => {
  beforeEach(() => {
    limpiarStorage();
    guardarCarritoEnStorage([itemCarrito]);
  });
  afterEach(limpiarDOM);

  it("muestra los productos guardados y el subtotal", () => {
    const contenedor = renderizarConApp(<Carrito />);
    expect(contenedor.textContent).toContain("Labial Mate Rose");
    expect(contenedor.textContent).toContain("$8.990");
  });

  it("al sumar una unidad actualiza la cantidad y el subtotal", () => {
    const contenedor = renderizarConApp(<Carrito />);
    clic(contenedor.querySelector("[aria-label='Agregar una unidad']"));
    expect(contenedor.textContent).toContain("$17.980");
  });

  it("muestra el mensaje de carrito vacío al eliminar el producto", () => {
    const contenedor = renderizarConApp(<Carrito />);
    clic(contenedor.querySelector("[aria-label^='Eliminar']"));
    expect(contenedor.textContent).toContain("Tu carrito está vacío");
  });
});

describe("Checkout", () => {
  beforeEach(() => {
    limpiarStorage();
    guardarCarritoEnStorage([itemCarrito]);
  });
  afterEach(limpiarDOM);

  function rutas() {
    return (
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-fallida" element={<CompraFallida />} />
      </Routes>
    );
  }

  function llenarFormulario(contenedor, tarjeta) {
    escribir(contenedor.querySelector("#nombre"), "Ana Pérez");
    escribir(contenedor.querySelector("#correo"), "ana@gmail.com");
    escribir(contenedor.querySelector("#telefono"), "912345678");
    escribir(contenedor.querySelector("#direccion"), "Calle Falsa 123");
    escribir(contenedor.querySelector("#comuna"), "Providencia");
    escribir(contenedor.querySelector("#ciudad"), "Santiago");
    escribir(contenedor.querySelector("#tarjeta"), tarjeta);
  }

  it("no deja pagar si faltan datos y muestra los errores", () => {
    const contenedor = renderizarConApp(rutas(), "/checkout");
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.textContent).toContain("Ingresa tu nombre completo");
    expect(contenedor.textContent).toContain("número de tarjeta válido");
  });

  it("muestra la compra exitosa y vacía el carrito con una tarjeta válida", () => {
    const contenedor = renderizarConApp(rutas(), "/checkout");
    llenarFormulario(contenedor, "4111111111111111");
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.textContent).toContain("¡Gracias por tu compra!");
    expect(JSON.parse(localStorage.getItem("bir_carrito")).length).toBe(0);
    expect(JSON.parse(localStorage.getItem("bir_pedidos")).length).toBe(1);
  });

  it("muestra la compra fallida con una tarjeta rechazada y conserva el carrito", () => {
    const contenedor = renderizarConApp(rutas(), "/checkout");
    llenarFormulario(contenedor, "4111111111110000");
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.textContent).toContain("No se pudo realizar el pago");
    expect(JSON.parse(localStorage.getItem("bir_carrito")).length).toBe(1);
  });
});

describe("Panel de administración", () => {
  beforeEach(limpiarStorage);
  afterEach(limpiarDOM);

  it("RutaAdmin redirige al login si no hay sesión de administrador", () => {
    const contenedor = renderizarConApp(
      <Routes>
        <Route path="/admin" element={<RutaAdmin><p>Contenido secreto</p></RutaAdmin>} />
        <Route path="/login" element={<p>Pantalla de login</p>} />
      </Routes>,
      "/admin"
    );
    expect(contenedor.textContent).toContain("Pantalla de login");
    expect(contenedor.textContent).not.toContain("Contenido secreto");
  });

  it("RutaAdmin muestra el contenido al administrador", () => {
    guardarSesion({ id: 1, nombre: "Administrador", correo: "admin@beautyinrose.cl", rol: "admin" });
    const contenedor = renderizarConApp(
      <Routes>
        <Route path="/admin" element={<RutaAdmin><p>Contenido secreto</p></RutaAdmin>} />
      </Routes>,
      "/admin"
    );
    expect(contenedor.textContent).toContain("Contenido secreto");
  });

  it("AdminProductos agrega un producto nuevo a la tabla", () => {
    const contenedor = renderizarConApp(<AdminProductos />);
    const filasAntes = contenedor.querySelectorAll("tbody tr").length;
    escribir(contenedor.querySelector("#pNombre"), "Iluminador Perla");
    escribir(contenedor.querySelector("#pPrecio"), "7990");
    escribir(contenedor.querySelector("#pStock"), "10");
    escribir(contenedor.querySelector("#pDescripcion"), "Iluminador de acabado perlado");
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.querySelectorAll("tbody tr").length).toBe(filasAntes + 1);
    expect(contenedor.textContent).toContain("Producto agregado correctamente");
  });

  it("AdminProductos pide confirmación antes de eliminar (mock de confirm)", () => {
    spyOn(window, "confirm").and.returnValue(true);
    const contenedor = renderizarConApp(<AdminProductos />);
    const filasAntes = contenedor.querySelectorAll("tbody tr").length;
    const botonEliminar = contenedor.querySelector("tbody .btn-outline-danger");
    clic(botonEliminar);
    expect(window.confirm).toHaveBeenCalled();
    expect(contenedor.querySelectorAll("tbody tr").length).toBe(filasAntes - 1);
  });
});

describe("Registro", () => {
  beforeEach(limpiarStorage);
  afterEach(limpiarDOM);

  function llenar(contenedor, correo, confirmar) {
    escribir(contenedor.querySelector("#nombreRegistro"), "Ana Pérez");
    escribir(contenedor.querySelector("#correoRegistro"), correo);
    escribir(contenedor.querySelector("#passwordRegistro"), "Clave1234");
    escribir(contenedor.querySelector("#confirmarRegistro"), confirmar);
    clic(contenedor.querySelector("#terminos"));
  }

  it("muestra error cuando las contraseñas no coinciden", () => {
    const contenedor = renderizarConApp(<Registro />);
    llenar(contenedor, "ana@gmail.com", "OtraClave123");
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.textContent).toContain("Las contraseñas no coinciden");
  });

  it("rechaza correos que no sean de gmail ni de duocuc", () => {
    const contenedor = renderizarConApp(<Registro />);
    llenar(contenedor, "ana@hotmail.com", "Clave1234");
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.textContent).toContain("solo @gmail.com o @duocuc.cl");
    expect(localStorage.getItem("bir_usuarios")).not.toContain("ana@hotmail.com");
  });

  it("acepta correos de duocuc", () => {
    const contenedor = renderizarConApp(<Registro />);
    llenar(contenedor, "ana@duocuc.cl", "Clave1234");
    enviarFormulario(contenedor.querySelector("form"));
    const usuarios = JSON.parse(localStorage.getItem("bir_usuarios"));
    expect(usuarios.some((u) => u.correo === "ana@duocuc.cl")).toBe(true);
  });

  it("crea el usuario con rol cliente cuando los datos son válidos", () => {
    const contenedor = renderizarConApp(<Registro />);
    llenar(contenedor, "ana@gmail.com", "Clave1234");
    enviarFormulario(contenedor.querySelector("form"));
    const usuarios = JSON.parse(localStorage.getItem("bir_usuarios"));
    const ana = usuarios.find((u) => u.correo === "ana@gmail.com");
    expect(ana.rol).toBe("cliente");
  });

  it("avisa cuando el correo ya está registrado", () => {
    crearUsuario({ nombre: "Ana Pérez", correo: "ana@gmail.com", password: "Clave1234" });
    const contenedor = renderizarConApp(<Registro />);
    llenar(contenedor, "ana@gmail.com", "Clave1234");
    enviarFormulario(contenedor.querySelector("form"));
    expect(contenedor.textContent).toContain("ya está registrado");
  });
});

describe("Administración de usuarios y pedidos", () => {
  beforeEach(limpiarStorage);
  afterEach(limpiarDOM);

  it("AdminUsuarios cambia el rol de un usuario a vendedor", () => {
    crearUsuario({ nombre: "Pedro Soto", correo: "pedro@correo.com", password: "Clave1234" });
    const contenedor = renderizarConApp(<AdminUsuarios />);
    const selector = contenedor.querySelector("select");
    elegirOpcion(selector, "vendedor");
    const usuarios = JSON.parse(localStorage.getItem("bir_usuarios"));
    expect(usuarios.find((u) => u.correo === "pedro@correo.com").rol).toBe("vendedor");
  });

  it("AdminPedidos muestra un mensaje cuando no hay pedidos", () => {
    const contenedor = renderizarConApp(<AdminPedidos />);
    expect(contenedor.textContent).toContain("Todavía no hay pedidos");
  });

  it("AdminPedidos cambia el estado de un pedido", () => {
    crearPedido({ cliente: "Ana", correo: "a@a.cl", direccion: "x", metodoPago: "tarjeta", items: [], total: 1000 });
    const contenedor = renderizarConApp(<AdminPedidos />);
    elegirOpcion(contenedor.querySelector("select"), "Enviado");
    expect(JSON.parse(localStorage.getItem("bir_pedidos"))[0].estado).toBe("Enviado");
  });
});
