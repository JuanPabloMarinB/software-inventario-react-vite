import React from "react";
import Select from "react-select";
import { useGetProducts } from "../hooks/useProducts";

export const BuscarProductoFacturaDos = ({ defaultValue, onProductoSeleccionado, actualizarProductos }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#9276e0",
      borderRadius: "10px",
      width: "300px",
      boxShadow: "none",
      fontColor: "red",
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
    }),
  };

  const {
    isLoading: isLoadingProducto,
    data: productos,
    isError: isErrorProducto,
    error: errorProducto,
  } = useGetProducts();

  const opciones = productos?.map((producto) => ({
    label: producto.nombre,
    value: producto.codigoBarra,
    producto: producto,
  }));

  const getOptionLabel = (option) => {
    return option.label;
  };

  const getOptionValue = (option) => {
    return option.value;
  };

  const handleSeleccionProducto = (opcion) => {
    const productoSeleccionado = opcion.producto; // Obtenemos el objeto completo del producto seleccionado
    actualizarProductos(productoSeleccionado); // Llama a la función actualizarProductos
  };
  

  return (
    <Select
      defaultValue={defaultValue}
      noOptionsMessage={() => "Producto no encontrado"}
      styles={customStyles}
      options={opciones}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      onChange={handleSeleccionProducto}
    />
  );
};
