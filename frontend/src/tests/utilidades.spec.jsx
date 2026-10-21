// Pruebas de las funciones de apoyo (formato, validaciones y filtros).
// Son funciones puras, así que no necesitan componentes.
import { filtrarProductos, obtenerCategorias } from "../utils/filtros";
import { formatearPrecio, generarId, porcentajeDescuento, precioFinal } from "../utils/formato";
import {
  validarCorreo,
  validarCorreoPermitido,
  validarMensaje,
  validarNombre,
  validarPassword,
  validarTarjeta,
} from "../utils/validaciones";

const productos = [
  { id: "a", nombre: "Labial Rojo", descripcion: "Labial mate", precio: 9000, precioOferta: null, categoria: "Maquillaje" },
  { id: "b", nombre: "Sérum Facial", descripcion: "Hidrata la piel", precio: 15000, precioOferta: 12000, categoria: "Cuidado de la piel" },
  { id: "c", nombre: "Delineador", descripcion: "Trazo preciso", precio: 6000, precioOferta: null, categoria: "Maquillaje" },
];

describe("formato", () => {
  it("formatearPrecio agrega el signo $ y el separador de miles", () => {
    expect(formatearPrecio(8990)).toBe("$8.990");
  });

  it("generarId quita tildes, espacios y mayúsculas", () => {
    expect(generarId("Máscara de Pestañas Volumen")).toBe("mascara-de-pestanas-volumen");
  });

  it("precioFinal devuelve el precio de oferta cuando existe", () => {
    expect(precioFinal(productos[1])).toBe(12000);
    expect(precioFinal(productos[0])).toBe(9000);
  });

  it("porcentajeDescuento calcula el descuento en porcentaje", () => {
    expect(porcentajeDescuento(productos[1])).toBe(20);
    expect(porcentajeDescuento(productos[0])).toBe(0);
  });
});

describe("validaciones", () => {
  it("validarCorreo acepta un correo correcto y rechaza uno incorrecto", () => {
    expect(validarCorreo("ana@correo.com")).toBe("");
    expect(validarCorreo("ana@correo")).not.toBe("");
  });

  it("validarCorreoPermitido solo acepta gmail.com y duocuc.cl", () => {
    expect(validarCorreoPermitido("ana@gmail.com")).toBe("");
    expect(validarCorreoPermitido("ana@duocuc.cl")).toBe("");
    expect(validarCorreoPermitido("ANA@Gmail.com")).toBe("");
    expect(validarCorreoPermitido("ana@hotmail.com")).not.toBe("");
    expect(validarCorreoPermitido("ana@gmail.com.ar")).not.toBe("");
    expect(validarCorreoPermitido("ana@mail.duocuc.cl")).not.toBe("");
    expect(validarCorreoPermitido("ana@gmail")).not.toBe("");
  });

  it("validarPassword exige 8 caracteres, una mayúscula y un número", () => {
    expect(validarPassword("Clave1234")).toBe("");
    expect(validarPassword("corta1A")).not.toBe("");
    expect(validarPassword("sinmayuscula1")).not.toBe("");
    expect(validarPassword("SinNumeroAqui")).not.toBe("");
  });

  it("validarNombre pide mínimo 3 caracteres", () => {
    expect(validarNombre("Al")).not.toBe("");
    expect(validarNombre("Ana")).toBe("");
  });

  it("validarMensaje pide mínimo 10 caracteres", () => {
    expect(validarMensaje("hola")).not.toBe("");
    expect(validarMensaje("Quisiera más información")).toBe("");
  });

  it("validarTarjeta exige 16 dígitos (con o sin espacios)", () => {
    expect(validarTarjeta("4111 1111 1111 1111")).toBe("");
    expect(validarTarjeta("1234")).not.toBe("");
  });
});

describe("filtros", () => {
  it("obtenerCategorias devuelve las categorías sin repetir", () => {
    expect(obtenerCategorias(productos)).toEqual(["Maquillaje", "Cuidado de la piel"]);
  });

  it("filtrarProductos busca por texto", () => {
    const resultado = filtrarProductos(productos, "serum", "Todas", "ninguno");
    expect(resultado.length).toBe(0);
    const conTilde = filtrarProductos(productos, "sérum", "Todas", "ninguno");
    expect(conTilde.length).toBe(1);
  });

  it("filtrarProductos filtra por categoría", () => {
    const resultado = filtrarProductos(productos, "", "Maquillaje", "ninguno");
    expect(resultado.length).toBe(2);
  });

  it("filtrarProductos ordena por precio de menor a mayor", () => {
    const resultado = filtrarProductos(productos, "", "Todas", "menor");
    expect(resultado.map((p) => p.id)).toEqual(["c", "a", "b"]);
  });
});
