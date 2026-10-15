// Pruebas del archivo de datos: operaciones CRUD sobre localStorage.
import {
  actualizarPedido,
  actualizarProducto,
  actualizarUsuario,
  buscarUsuarioPorCredenciales,
  crearPedido,
  crearProducto,
  crearUsuario,
  eliminarProducto,
  obtenerPedidos,
  obtenerProductos,
  obtenerUsuarios,
} from "../data/baseDatos";
import { limpiarStorage } from "./ayudas";

describe("baseDatos - productos", () => {
  beforeEach(limpiarStorage);

  it("obtenerProductos devuelve el catálogo inicial", () => {
    expect(obtenerProductos().length).toBeGreaterThan(0);
  });

  it("crearProducto agrega un producto y le genera un id", () => {
    const antes = obtenerProductos().length;
    const nuevo = crearProducto({
      nombre: "Máscara de Pestañas",
      precio: 8990,
      stock: 10,
      categoria: "Maquillaje",
      descripcion: "Da volumen a las pestañas.",
    });
    expect(nuevo.id).toBe("mascara-de-pestanas");
    expect(obtenerProductos().length).toBe(antes + 1);
  });

  it("crearProducto no repite ids cuando el nombre ya existe", () => {
    const datos = { nombre: "Producto Repetido", precio: 1000, stock: 1, categoria: "Maquillaje", descripcion: "Descripcion de prueba" };
    const primero = crearProducto(datos);
    const segundo = crearProducto(datos);
    expect(primero.id).not.toBe(segundo.id);
  });

  it("actualizarProducto cambia el precio", () => {
    actualizarProducto("labial-mate-rose", { precio: 9990 });
    const producto = obtenerProductos().find((p) => p.id === "labial-mate-rose");
    expect(producto.precio).toBe(9990);
  });

  it("eliminarProducto quita el producto de la lista", () => {
    eliminarProducto("labial-mate-rose");
    const existe = obtenerProductos().some((p) => p.id === "labial-mate-rose");
    expect(existe).toBeFalse();
  });
});

describe("baseDatos - usuarios", () => {
  beforeEach(limpiarStorage);

  it("crearUsuario guarda un usuario nuevo con rol cliente", () => {
    const usuario = crearUsuario({ nombre: "Ana Pérez", correo: "ANA@correo.com", password: "Clave1234" });
    expect(usuario.rol).toBe("cliente");
    expect(usuario.correo).toBe("ana@correo.com");
  });

  it("crearUsuario devuelve null si el correo ya está registrado", () => {
    crearUsuario({ nombre: "Ana Pérez", correo: "ana@correo.com", password: "Clave1234" });
    const repetido = crearUsuario({ nombre: "Otra Ana", correo: "ana@correo.com", password: "Clave1234" });
    expect(repetido).toBeNull();
  });

  it("buscarUsuarioPorCredenciales encuentra al administrador", () => {
    const admin = buscarUsuarioPorCredenciales("admin@beautyinrose.cl", "Admin1234");
    expect(admin).not.toBeNull();
    expect(admin.rol).toBe("admin");
  });

  it("buscarUsuarioPorCredenciales devuelve null con contraseña incorrecta", () => {
    expect(buscarUsuarioPorCredenciales("admin@beautyinrose.cl", "otra")).toBeNull();
  });

  it("actualizarUsuario cambia el rol a vendedor", () => {
    const usuario = crearUsuario({ nombre: "Pedro Soto", correo: "pedro@correo.com", password: "Clave1234" });
    actualizarUsuario(usuario.id, { rol: "vendedor" });
    const guardado = obtenerUsuarios().find((u) => u.id === usuario.id);
    expect(guardado.rol).toBe("vendedor");
  });
});

describe("baseDatos - pedidos", () => {
  beforeEach(limpiarStorage);

  it("crearPedido guarda el pedido con estado Pagado y número BIR-", () => {
    const pedido = crearPedido({
      cliente: "Ana",
      correo: "ana@correo.com",
      direccion: "Calle 1",
      metodoPago: "tarjeta",
      items: [],
      total: 5000,
    });
    expect(pedido.id.startsWith("BIR-")).toBeTrue();
    expect(pedido.estado).toBe("Pagado");
    expect(obtenerPedidos().length).toBe(1);
  });

  it("actualizarPedido cambia el estado", () => {
    const pedido = crearPedido({ cliente: "Ana", correo: "a@a.cl", direccion: "x", metodoPago: "tarjeta", items: [], total: 1000 });
    actualizarPedido(pedido.id, { estado: "Enviado" });
    expect(obtenerPedidos()[0].estado).toBe("Enviado");
  });
});
