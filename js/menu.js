/* =========================================
   BEAUTY IN ROSE - MENU HAMBURGUESA
   Muestra y oculta el menu de navegacion
   en pantallas pequeñas (celular).
   ========================================= */

function cerrarMenu() {
  var boton = document.getElementById("botonMenu");
  var lista = document.getElementById("listaNav");
  if (boton === null || lista === null) {
    return;
  }
  lista.classList.remove("menu-abierto");
  boton.classList.remove("abierto");
  boton.setAttribute("aria-expanded", "false");
}

document.addEventListener("DOMContentLoaded", function () {
  var boton = document.getElementById("botonMenu");
  var lista = document.getElementById("listaNav");
  if (boton === null || lista === null) {
    return;
  }

  boton.addEventListener("click", function () {
    var abierto = lista.classList.toggle("menu-abierto");
    boton.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
  });

  var enlaces = lista.querySelectorAll("a");
  for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener("click", cerrarMenu);
  }
});
