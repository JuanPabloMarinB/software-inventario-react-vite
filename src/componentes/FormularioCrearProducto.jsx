import "../styles/formStyles.css";
import { createProduct } from "../hooks/useProducts";
import { useGetMedida, useGetCategoria } from "../hooks/useEnums";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FormularioCrearProducto = () => {
  const [selectedMedida, setSelectedMedida] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);

  const handleClickAceptar = () => {
    setMensajeVisible(false);
  };

  const queryClient = useQueryClient();
  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products"), setMensajeVisible(true);
    },
  });

  const {
    isLoading: isLoadingMedida,
    data: medida,
    isError: isErrorMedida,
    error: errorMedida,
  } = useGetMedida();
  const {
    isLoading: isLoadingCategoria,
    data: categoria,
    isError: isErrorCategoria,
    error: errorCategoria,
  } = useGetCategoria();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const producto = Object.fromEntries(formData);
    console.log(producto);
    addProductMutation.mutate(producto);
    e.target.reset();
  };

  if (isLoadingCategoria || isLoadingMedida) {
    return <div>cargando..</div>;
  } else if (isErrorCategoria) {
    return <h1>Error: {isErrorCategoria}</h1>;
  } else if (isErrorMedida) {
    return <h1>Error: {errorMedida}</h1>;
  }

  return (
    <>
      <h1 className="h1-titulo">Registra tu nuevo producto</h1>
      <form
        className={`form-container ${mensajeVisible ? "with-overlay" : ""}`}
        onSubmit={handleSubmit}
      >
        <label className="input-label nombre" htmlFor="nombre">
          Nombre
          <input
            className="input nombre-producto"
            placeholder="Ingresa el nombre del producto"
            type="text"
            required
            name="nombre"
          />
        </label>

        <label className="input-label codigoBarra" htmlFor="codigoBarra">
          Código de Barras
          <input
            type="number"
            className="input "
            min={1}
            required
            name="codigoBarra"
          />
        </label>
        <label className="input-label medida" htmlFor="medida">
          Medida
          <select
            value={selectedMedida}
            required
            className="select-box"
            name="medida"
            onChange={(e) => setSelectedMedida(e.target.value)}
          >
            {medida?.map((medidaValue, index) => (
              <option key={index} value={medidaValue} className="opcion-input">
                {medidaValue}
              </option>
            ))}
          </select>
        </label>

        <label className="input-label categoria" htmlFor="categoria">
          Categoría
          <select
            value={selectedCategoria}
            className="select-box"
            name="categoria"
            onChange={(e) => setSelectedCategoria(e.target.value)}
          >
            {categoria?.map((categoriaValue, index) => (
              <option
                key={index}
                value={categoriaValue}
                className="opcion-input"
              >
                {categoriaValue}
              </option>
            ))}
          </select>
        </label>

        <label className="input-label cantidad" htmlFor="cantidadIngresada">
          Cantidad
          <input
            className="input "
            type="number"
            min={1}
            required
            name="cantidadIngresada"
          />
        </label>

        <label className="input-label costoUnidad" htmlFor="costoXunidad">
          Costo por Unidad/Kg
          <input
            className="input "
            type="number"
            min={1}
            required
            name="costoXunidad"
          />
        </label>

        <label className="input-label precioVenta" htmlFor="precioVenta">
          Precio de Venta
          <input
            className="input "
            type="number"
            min={1}
            required
            name="precioVenta"
          />
        </label>
        <div className="boton-container">
          <button type="submit" className="button">
            Crear Producto
          </button>
        </div>
      </form>
      <div
        className={`producto-creado-mensaje-container ${
          mensajeVisible ? "visible" : ""
        }`}
      >
        <div className="mensaje-producto-creado-mensaje">
          Producto Creado Con Éxito
        </div>
        <a
          className="boton-aceptar-producto-creado-mensaje"
          onClick={handleClickAceptar}
        >
          Aceptar
        </a>
      </div>
    </>
  );
};

export default FormularioCrearProducto;
