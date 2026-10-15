// Props:
//  - valor: texto actual de la busqueda
//  - alCambiar: funcion que recibe el nuevo texto
function BarraBusqueda({ valor, alCambiar }) {
  return (
    <div className="mb-3">
      <label htmlFor="busqueda" className="form-label visually-hidden">Buscar productos</label>
      <input
        id="busqueda"
        type="search"
        className="form-control"
        placeholder="Buscar productos..."
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
      />
    </div>
  );
}

export default BarraBusqueda;
