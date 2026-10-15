// Props:
//  - categorias: lista de nombres de categoria
//  - seleccionada: categoria activa ("Todas" por defecto)
//  - alSeleccionar: funcion que recibe la categoria elegida
function FiltroCategorias({ categorias, seleccionada, alSeleccionar }) {
  const opciones = ["Todas", ...categorias];

  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      {opciones.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={"btn btn-sm " + (seleccionada === categoria ? "btn-rose" : "btn-outline-rose")}
          onClick={() => alSeleccionar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

export default FiltroCategorias;
