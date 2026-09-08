/* =========================================
   BEAUTY IN ROSE - DATOS DE PRODUCTOS
   Se usa en producto.html para mostrar el
   detalle de un producto según su id.
   ========================================= */

var PRODUCTOS = [
  {
    id: "labial-mate-rose",
    nombre: "Labial Mate Rose",
    precio: 8990,
    imagen: "img/productos/labial-mate-rose.jpg",
    categoria: "Maquillaje",
    descripcion: "Labial de acabado mate con larga duración. Su fórmula liviana no reseca los labios y entrega un color intenso desde la primera pasada. Ideal para el día a día o para looks más elaborados."
  },
  {
    id: "labial-hidratante-coral",
    nombre: "Labial Hidratante Coral",
    precio: 7990,
    imagen: "img/productos/labial-hidratante-coral.jpg",
    categoria: "Maquillaje",
    descripcion: "Fórmula enriquecida con vitamina E que hidrata mientras entrega un color coral natural. Perfecto para quienes buscan comodidad durante todo el día sin sacrificar color."
  },
  {
    id: "paleta-de-sombras",
    nombre: "Paleta de Sombras",
    precio: 15990,
    imagen: "img/productos/paleta-de-sombras.jpg",
    categoria: "Maquillaje",
    descripcion: "Paleta con tonos rosados y neutros, pensada para crear looks desde los más naturales hasta los más intensos. Sombras altamente pigmentadas y fáciles de difuminar."
  },
  {
    id: "rubor-en-polvo-rosa",
    nombre: "Rubor en Polvo Rosa",
    precio: 9990,
    imagen: "img/productos/rubor-en-polvo-rosa.jpg",
    categoria: "Maquillaje",
    descripcion: "Rubor en polvo de textura suave que entrega un toque natural y luminoso a tus mejillas. Fácil de aplicar y de larga duración."
  },
  {
    id: "delineador-de-ojos",
    nombre: "Delineador de Ojos",
    precio: 6990,
    imagen: "img/productos/delineador-de-ojos.jpg",
    categoria: "Maquillaje",
    descripcion: "Delineador líquido de trazo preciso y secado rápido. Su fórmula resistente al agua asegura un delineado perfecto durante todo el día."
  },
  {
    id: "serum-facial-hidratante",
    nombre: "Sérum Facial Hidratante",
    precio: 12990,
    imagen: "img/productos/serum-facial-hidratante.jpg",
    categoria: "Cuidado de la piel",
    descripcion: "Sérum con ácido hialurónico que hidrata en profundidad y deja la piel más luminosa. Se absorbe rápidamente y puede usarse mañana y noche."
  },
  {
    id: "crema-hidratante-dia",
    nombre: "Crema Hidratante de Día",
    precio: 10990,
    imagen: "img/productos/crema-hidratante-dia.jpg",
    categoria: "Cuidado de la piel",
    descripcion: "Crema de día que hidrata y protege la piel durante toda la jornada. Textura liviana que se absorbe rápido, ideal para usar bajo el maquillaje."
  },
  {
    id: "bruma-facial-de-rosas",
    nombre: "Bruma Facial de Rosas",
    precio: 8490,
    imagen: "img/productos/bruma-facial-de-rosas.jpg",
    categoria: "Cuidado de la piel",
    descripcion: "Bruma refrescante con extracto de rosas que ilumina y revitaliza la piel en segundos. Perfecta para refrescar el rostro en cualquier momento del día."
  }
];

function buscarProductoPorId(id) {
  for (var i = 0; i < PRODUCTOS.length; i++) {
    if (PRODUCTOS[i].id === id) {
      return PRODUCTOS[i];
    }
  }
  return null;
}
