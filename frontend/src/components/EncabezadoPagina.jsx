// Banda con el título de cada página interna
function EncabezadoPagina({ titulo, subtitulo }) {
  return (
    <header className="encabezado-pagina">
      <div className="container">
        <h1>{titulo}</h1>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
    </header>
  );
}

export default EncabezadoPagina;
