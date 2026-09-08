/* =========================================
   BEAUTY IN ROSE - DETALLE DE ARTÍCULO
   Lee el id del artículo desde la URL
   (ej: blog-post.html?id=tips-maquillaje-duradero)
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  var contenedor = document.getElementById("detalleBlog");
  var noEncontrado = document.getElementById("articuloNoEncontrado");
  if (contenedor === null) {
    return;
  }

  var parametros = new URLSearchParams(window.location.search);
  var id = parametros.get("id");
  var articulo = id === null ? null : buscarArticuloPorId(id);

  if (articulo === null) {
    contenedor.classList.add("oculto");
    noEncontrado.classList.remove("oculto");
    return;
  }

  document.title = articulo.titulo + " | Beauty in Rose";
  document.getElementById("portadaBlog").textContent = articulo.icono;
  document.getElementById("fechaBlog").textContent = articulo.fecha;
  document.getElementById("tituloBlog").textContent = articulo.titulo;

  var cuerpo = document.getElementById("cuerpoBlog");
  cuerpo.innerHTML = "";
  for (var i = 0; i < articulo.contenido.length; i++) {
    var parrafo = document.createElement("p");
    parrafo.textContent = articulo.contenido[i];
    cuerpo.appendChild(parrafo);
  }
});
