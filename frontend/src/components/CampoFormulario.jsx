// Campo de formulario reutilizable: etiqueta + input + mensaje de error.
function CampoFormulario({ id, etiqueta, tipo = "text", valor, alCambiar, error, placeholder, autoComplete }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">{etiqueta}</label>
      <input
        id={id}
        type={tipo}
        className={"form-control" + (error ? " is-invalid" : "")}
        value={valor}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => alCambiar(e.target.value)}
      />
      {error && <div className="invalid-feedback d-block" role="alert">{error}</div>}
    </div>
  );
}

export default CampoFormulario;
