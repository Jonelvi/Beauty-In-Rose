// Muestra en consola el resumen de cobertura por archivo (después de npm test)
const resumen = require("./coverage/resumen.json");

Object.entries(resumen).forEach(([ruta, datos]) => {
  const nombre = ruta === "total" ? "TOTAL" : ruta.split("\\").join("/").split("/src/")[1];
  console.log(
    nombre.padEnd(40),
    "Sentencias " + String(datos.statements.pct).padStart(6) + "%",
    "Ramas " + String(datos.branches.pct).padStart(6) + "%",
    "Funciones " + String(datos.functions.pct).padStart(6) + "%",
    "Líneas " + String(datos.lines.pct).padStart(6) + "%"
  );
});
