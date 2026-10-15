import { useCarrito } from "../context/CarritoContext";

// Mensajito que aparece abajo cuando se agrega un producto al carrito
function AvisoCarrito() {
  const { aviso } = useCarrito();
  if (aviso === "") {
    return null;
  }
  return (
    <div className="aviso-carrito" role="status">
      {aviso}
    </div>
  );
}

export default AvisoCarrito;
