import "../styles/formStyles.css";
import { createProduct } from "../hooks/useProducts";
import { useGetMedida, useGetCategoria } from "../hooks/useEnums";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";

const FormularioCrearProducto = () => {
  const [selectedMedida, setSelectedMedida] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "3.5px",
      borderColor: "#9276e0",
      borderRadius: "5px",
      boxShadow: "none",
      outline: "none",
      "&:hover": {
        borderColor: "#9276e0",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#9276e0"
        : state.isFocused
        ? "#9276e087"
        : "#fff",
      color: state.isSelected ? "#fff" : state.isFocused ? "#fff" : "#1a1a1a",
      // Agrega otros estilos personalizados según tus necesidades
    }),
  };

  const handleClickAceptar = () => {
    setMensajeVisible(false);
  };
  const handleMedidaSelectChange = ({ value }) => {
    setSelectedMedida(value);
  };
  const handleCategoriaSelectChange = ({ value }) => {
    setSelectedCategoria(value);
  };
  const handleAnimationEnd = () => {
    if (!mensajeVisible) {
      setMensajeVisible(true);
      setMensajeVisible(false);
    }
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
    data: medidas,
    isError: isErrorMedida,
    error: errorMedida,
  } = useGetMedida();
  const {
    isLoading: isLoadingCategoria,
    data: categorias,
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
  }

  if (isErrorMedida) {
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

        <label htmlFor="medida" className="input-label medida">
          Medida
          <Select
            noOptionsMessage={() => "No encontrado"}
            className="select-medida"
            defaultValue={{
              label: medidas[0],
              value: medidas[0],
            }}
            styles={customStyles}
            options={medidas.map((medida) => ({
              label: medida,
              value: medida,
            }))}
            onChange={handleMedidaSelectChange}
          />
        </label>
        <label htmlFor="categoria" className="input-label categoria">
          Categoría
          <Select
            noOptionsMessage={() => "No encontrado"}
            className="select-categoria"
            defaultValue={{
              label: categorias[0],
              value: categorias[0],
            }}
            options={categorias.map((categoria) => ({
              label: categoria,
              value: categoria,
            }))}
            styles={customStyles}
            onChange={handleCategoriaSelectChange}
          />
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
        } ${!mensajeVisible ? "not-active" : ""}`}
        onAnimationEnd={handleAnimationEnd}
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
