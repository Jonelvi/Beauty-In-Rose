import { useState } from "react";
import CampoFormulario from "../../components/CampoFormulario";
import { useTienda } from "../../context/TiendaContext";
import { formatearPrecio } from "../../utils/formato";

const formularioVacio = {
  nombre: "",
  precio: "",
  precioOferta: "",
  stock: "",
  categoria: "Maquillaje",
  imagen: "",
  descripcion: "",
};

function AdminProductos() {
  const { productos, agregarProducto, editarProducto, borrarProducto } = useTienda();
  const [formulario, setFormulario] = useState(formularioVacio);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  function cambiar(campo, valor) {
    setFormulario({ ...formulario, [campo]: valor });
  }

  function validar() {
    const nuevos = {};
    nuevos.nombre = formulario.nombre.trim().length < 3 ? "Ingresa un nombre válido." : "";
    nuevos.precio = Number(formulario.precio) > 0 ? "" : "Ingresa un precio mayor a 0.";
    nuevos.stock =
      formulario.stock !== "" && Number(formulario.stock) >= 0 ? "" : "Ingresa el stock disponible.";
    nuevos.descripcion =
      formulario.descripcion.trim().length < 10 ? "La descripción debe tener al menos 10 caracteres." : "";
    if (formulario.precioOferta !== "" && Number(formulario.precioOferta) >= Number(formulario.precio)) {
      nuevos.precioOferta = "El precio de oferta debe ser menor al precio normal.";
    }
    setErrores(nuevos);
    return Object.values(nuevos).every((e) => e === undefined || e === "");
  }

  function guardar(evento) {
    evento.preventDefault();
    if (!validar()) {
      return;
    }

    const datos = {
      nombre: formulario.nombre.trim(),
      precio: Number(formulario.precio),
      precioOferta: formulario.precioOferta === "" ? null : Number(formulario.precioOferta),
      stock: Number(formulario.stock),
      categoria: formulario.categoria,
      imagen: formulario.imagen.trim() || undefined,
      descripcion: formulario.descripcion.trim(),
    };

    if (editandoId === null) {
      agregarProducto(datos);
      setMensaje("Producto agregado correctamente.");
    } else {
      if (datos.imagen === undefined) {
        delete datos.imagen;
      }
      editarProducto(editandoId, datos);
      setMensaje("Producto actualizado correctamente.");
    }
    cancelar(false);
  }

  function empezarEdicion(producto) {
    setEditandoId(producto.id);
    setMensaje("");
    setErrores({});
    setFormulario({
      nombre: producto.nombre,
      precio: String(producto.precio),
      precioOferta: producto.precioOferta ? String(producto.precioOferta) : "",
      stock: String(producto.stock),
      categoria: producto.categoria,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
    });
  }

  function cancelar(limpiarMensaje = true) {
    setEditandoId(null);
    setFormulario(formularioVacio);
    setErrores({});
    if (limpiarMensaje) {
      setMensaje("");
    }
  }

  function eliminar(producto) {
    if (window.confirm("¿Eliminar " + producto.nombre + "?")) {
      borrarProducto(producto.id);
      setMensaje("Producto eliminado.");
    }
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-xl-7">
        <div className="table-responsive card shadow-sm">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Oferta</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.imagen} alt="" className="miniatura-admin me-2" />
                    {p.nombre}
                  </td>
                  <td>{formatearPrecio(p.precio)}</td>
                  <td>{p.precioOferta ? formatearPrecio(p.precioOferta) : "-"}</td>
                  <td>{p.stock}</td>
                  <td className="text-nowrap">
                    <button className="btn btn-sm btn-outline-rose me-1" onClick={() => empezarEdicion(p)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-12 col-xl-5">
        <form className="card shadow-sm" onSubmit={guardar} noValidate>
          <div className="card-body">
            <h2 className="h5 mb-3">{editandoId === null ? "Agregar producto" : "Editar producto"}</h2>
            <CampoFormulario id="pNombre" etiqueta="Nombre" valor={formulario.nombre} alCambiar={(v) => cambiar("nombre", v)} error={errores.nombre} />
            <div className="row">
              <div className="col-6"><CampoFormulario id="pPrecio" etiqueta="Precio" tipo="number" valor={formulario.precio} alCambiar={(v) => cambiar("precio", v)} error={errores.precio} /></div>
              <div className="col-6"><CampoFormulario id="pOferta" etiqueta="Precio oferta" tipo="number" valor={formulario.precioOferta} alCambiar={(v) => cambiar("precioOferta", v)} error={errores.precioOferta} /></div>
            </div>
            <CampoFormulario id="pStock" etiqueta="Stock" tipo="number" valor={formulario.stock} alCambiar={(v) => cambiar("stock", v)} error={errores.stock} />

            <div className="mb-3">
              <label htmlFor="pCategoria" className="form-label fw-semibold">Categoría</label>
              <select id="pCategoria" className="form-select" value={formulario.categoria} onChange={(e) => cambiar("categoria", e.target.value)}>
                <option value="Maquillaje">Maquillaje</option>
                <option value="Cuidado de la piel">Cuidado de la piel</option>
              </select>
            </div>

            <CampoFormulario id="pImagen" etiqueta="Imagen (ruta o URL)" valor={formulario.imagen} alCambiar={(v) => cambiar("imagen", v)} placeholder="/img/productos/mi-producto.jpg" />

            <div className="mb-3">
              <label htmlFor="pDescripcion" className="form-label fw-semibold">Descripción</label>
              <textarea
                id="pDescripcion"
                rows="3"
                className={"form-control" + (errores.descripcion ? " is-invalid" : "")}
                value={formulario.descripcion}
                onChange={(e) => cambiar("descripcion", e.target.value)}
              ></textarea>
              {errores.descripcion && <div className="invalid-feedback d-block" role="alert">{errores.descripcion}</div>}
            </div>

            <button type="submit" className="btn btn-rose me-2">
              {editandoId === null ? "Agregar producto" : "Guardar cambios"}
            </button>
            {editandoId !== null && (
              <button type="button" className="btn btn-outline-rose" onClick={() => cancelar()}>Cancelar</button>
            )}
            {mensaje && <p className="text-success mt-3 mb-0" role="status">{mensaje}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductos;
