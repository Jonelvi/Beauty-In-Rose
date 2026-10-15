import TarjetaProducto from "./TarjetaProducto";

// Muestra una grilla de productos o un mensaje si no hay resultados
function ListaProductos({ productos, alAgregar }) {
  if (productos.length === 0) {
    return <p className="text-center py-5 mensaje-vacio">No encontramos productos para mostrar.</p>;
  }

  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={producto.id}>
          <TarjetaProducto producto={producto} alAgregar={alAgregar} />
        </div>
      ))}
    </div>
  );
}

export default ListaProductos;
