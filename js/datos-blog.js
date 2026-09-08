/* =========================================
   BEAUTY IN ROSE - DATOS DEL BLOG
   Se usa en blog.html y blog-post.html
   ========================================= */

var ARTICULOS_BLOG = [
  {
    id: "tips-maquillaje-duradero",
    icono: "💄",
    titulo: "5 tips para un maquillaje que dure todo el día",
    fecha: "20 de agosto, 2026",
    resumen: "Aprende a preparar tu piel y a fijar tu maquillaje para que se vea impecable desde la mañana hasta la noche.",
    contenido: [
      "Un maquillaje duradero empieza antes de aplicar cualquier producto: la clave está en preparar bien la piel. Limpia tu rostro, aplica una crema hidratante liviana y espera unos minutos antes de comenzar.",
      "Usa una base con acabado mate si tu piel tiende a producir brillo durante el día, y aplica corrector solo donde lo necesites para no cargar la piel de producto.",
      "Fija tus sombras y tu rubor con un poco de polvo traslúcido, especialmente en la zona T. Esto evita que el maquillaje se mueva con el calor o la humedad.",
      "Para el labial, usa un contorno de labios antes de aplicar el color: ayuda a que dure más y evita que se corra.",
      "Por último, termina tu look con una bruma fijadora. Nuestra Bruma Facial de Rosas no solo fija el maquillaje, también refresca la piel durante el día."
    ]
  },
  {
    id: "elegir-labial-segun-tu-piel",
    icono: "💋",
    titulo: "Cómo elegir el labial perfecto según tu tono de piel",
    fecha: "5 de agosto, 2026",
    resumen: "Descubre qué tonos de labial favorecen más tu piel, ya sea clara, media u oscura.",
    contenido: [
      "Elegir el labial correcto puede cambiar por completo un look. Si tienes piel clara con subtono frío, los tonos rosados y berries suelen favorecerte más.",
      "Si tu piel tiene subtono cálido, los tonos coral, durazno y rojos anaranjados resaltan tu color natural sin apagar tu rostro.",
      "Para pieles medias y morenas, los tonos vino, ciruela y rojos intensos suelen verse espectaculares y aportan mucho carácter al maquillaje.",
      "Un truco simple: mira las venas de tu muñeca. Si se ven más azules, tienes subtono frío; si se ven más verdes, tienes subtono cálido. Esto te ayudará a elegir mejor.",
      "Recuerda que no hay reglas estrictas: lo más importante es probar distintos tonos hasta encontrar los que te hacen sentir más cómoda y segura."
    ]
  },
  {
    id: "rutina-skincare-principiantes",
    icono: "🧴",
    titulo: "Rutina de skincare en 3 pasos para principiantes",
    fecha: "22 de julio, 2026",
    resumen: "No necesitas diez productos para cuidar tu piel. Te contamos una rutina simple para empezar.",
    contenido: [
      "Si recién estás empezando en el mundo del cuidado de la piel, no te compliques: una rutina simple y constante es mucho más efectiva que usar muchos productos a la vez.",
      "Paso 1 - Limpieza: lava tu rostro mañana y noche con un limpiador suave para retirar impurezas sin resecar la piel.",
      "Paso 2 - Hidratación: aplica un sérum como nuestro Sérum Facial Hidratante para reforzar la barrera de la piel, seguido de una crema hidratante.",
      "Paso 3 - Protección: durante el día, no olvides aplicar protector solar. Es el paso más importante para prevenir el envejecimiento prematuro.",
      "Con estos tres pasos, tu piel se mantendrá saludable. Con el tiempo puedes ir sumando productos más específicos según lo que tu piel necesite."
    ]
  },
  {
    id: "tendencias-maquillaje-temporada",
    icono: "✨",
    titulo: "Tendencias de maquillaje para esta temporada",
    fecha: "10 de julio, 2026",
    resumen: "Estos son los looks y técnicas que están marcando tendencia esta temporada.",
    contenido: [
      "Esta temporada la piel luminosa es protagonista: las cremas iluminadoras y los strobe cream se usan para lograr un efecto \"glow\" natural sin necesidad de brillos exagerados.",
      "Los tonos neutros y rosados siguen dominando en sombras y labiales, ideales para looks del día a día que también funcionan para la noche.",
      "El delineado fino y prolijo vuelve a estar de moda, dejando atrás los trazos muy gruesos de temporadas anteriores.",
      "Y para las mejillas, el rubor en crema y en polvo se combinan para dar un efecto más natural y duradero.",
      "Recuerda que las tendencias son solo una guía: el mejor maquillaje es el que te hace sentir cómoda contigo misma."
    ]
  }
];

function buscarArticuloPorId(id) {
  for (var i = 0; i < ARTICULOS_BLOG.length; i++) {
    if (ARTICULOS_BLOG[i].id === id) {
      return ARTICULOS_BLOG[i];
    }
  }
  return null;
}
