const equipo = [
  { nombre: "Camila Venegas", foto: "/img/equipo/camila-venegas.jpg", rol: "Desarrolladora Web Full Stack" },
  { nombre: "Francisca Escobar", foto: "/img/equipo/francisca-escobar.jpg", rol: "Desarrolladora Web Full Stack" },
  { nombre: "Jonelvi Castro", foto: "/img/equipo/jonelvi-castro.jpg", rol: "Desarrollador Web Full Stack" },
];

function Nosotros() {
  return (
    <div className="container py-4">
      <h1 className="titulo-seccion text-center">Sobre Nosotros</h1>
      <p className="text-center">Belleza natural, cuidado real.</p>

      <section className="row g-4 align-items-center my-4">
        <div className="col-12 col-md-6">
          <img src="/img/nosotros-fachada.jpg" alt="Fachada de la tienda Beauty in Rose" className="img-fluid rounded-4 shadow" />
        </div>
        <div className="col-12 col-md-6">
          <h2>Nuestra Historia</h2>
          <p>
            Beauty in Rose nació en 2020 con una idea simple: crear productos de belleza
            accesibles, efectivos y pensados para todo tipo de piel. Empezamos como un
            pequeño emprendimiento familiar y hoy llegamos a cientos de clientas que confían
            en nosotros para su rutina diaria de belleza.
          </p>
          <p>
            Cada producto es seleccionado y probado cuidadosamente para asegurar calidad,
            porque creemos que sentirse bien empieza por cuidarse a una misma.
          </p>
        </div>
      </section>

      <section className="row g-4 my-4">
        <div className="col-12 col-md-6">
          <div className="card h-100 tarjeta-rosa"><div className="card-body text-center">
            <h2>Misión</h2>
            <p>Ofrecer productos de belleza de calidad que realcen la confianza y el bienestar de nuestras clientas, con atención cercana y precios justos.</p>
          </div></div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card h-100 tarjeta-rosa"><div className="card-body text-center">
            <h2>Visión</h2>
            <p>Ser la tienda de belleza online de referencia en Chile, reconocida por la calidad de sus productos y la cercanía con su comunidad.</p>
          </div></div>
        </div>
      </section>

      <section className="seccion-rosa rounded-4 p-4 my-4">
        <h2 className="text-center">Equipo de Desarrollo</h2>
        <p className="text-center">El equipo detrás del código de este sitio web.</p>
        <div className="row g-4 justify-content-center">
          {equipo.map((persona) => (
            <div className="col-12 col-sm-6 col-md-4 text-center" key={persona.nombre}>
              <img src={persona.foto} alt={persona.nombre} className="foto-equipo" />
              <h3 className="h5 mt-3">{persona.nombre}</h3>
              <p>{persona.rol}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Nosotros;
