import { formatearPrecio } from "../utils/formato";

// Props:
//  - item: producto dentro del carrito (con cantidad)
//  - alCambiarCantidad(id, cambio): suma o resta unidades
//  - alQuitar(id): elimina el producto del carrito
function ItemCarrito({ item, alCambiarCantidad, alQuitar }) {
  return (
    <li className="list-group-item d-flex align-items-center gap-3 flex-wrap">
      <img src={item.imagen} alt={item.nombre} className="item-carrito-img" />
      <div className="flex-grow-1">
        <p className="fw-semibold mb-1">{item.nombre}</p>
        <p className="precio mb-0">{formatearPrecio(item.precio)}</p>
      </div>
      <div className="btn-group" role="group" aria-label="Cantidad">
        <button
          type="button"
          className="btn btn-outline-rose btn-sm"
          aria-label="Quitar una unidad"
          onClick={() => alCambiarCantidad(item.id, -1)}
        >
          −
        </button>
        <span className="btn btn-sm disabled cantidad-item">{item.cantidad}</span>
        <button
          type="button"
          className="btn btn-outline-rose btn-sm"
          aria-label="Agregar una unidad"
          onClick={() => alCambiarCantidad(item.id, 1)}
        >
          +
        </button>
      </div>
      <p className="mb-0 fw-semibold subtotal-item">
        {formatearPrecio(item.precio * item.cantidad)}
      </p>
      <button
        type="button"
        className="btn btn-sm btn-outline-danger"
        aria-label={"Eliminar " + item.nombre + " del carrito"}
        onClick={() => alQuitar(item.id)}
      >
        🗑
      </button>
    </li>
  );
}

export default ItemCarrito;
