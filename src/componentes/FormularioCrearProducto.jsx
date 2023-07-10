import React, { useState, useEffect } from "react";
import { API, API_DEV, obtenerEnums } from "../utils/api";
import "../styles/formStyles.css";

const CrearProductoForm = () => {
  const [nombre, setNombre] = useState("");
  const [cantidadIngresada, setCantidadIngresada] = useState("");
  const [costoXunidad, setCostoXunidad] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [codigoBarra, setCodigoBarra] = useState("");
  const [dataMedida, setDataMedida] = useState([]);
  const [dataCategoria, setDataCategoria] = useState([]);
  const [categoria, setCategoria] = useState(dataCategoria[0]);
  const [medida, setMedida] = useState(dataMedida[0]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const newProducto = {
    nombre,
    codigoBarra,
    medida,
    categoria,
    cantidadIngresada,
    costoXunidad,
    precioVenta,
  };

  useEffect(() => {
    obtenerEnums("medida")
      .then((medida) => {
        if (Array.isArray(medida)) {
          setDataMedida(medida);
        } else {
          console.error("Los datos obtenidos no son un array:", medida);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  useEffect(() => {
    obtenerEnums("categoria")
      .then((categoria) => {
        if (Array.isArray(categoria)) {
          setDataCategoria(categoria);
        } else {
          console.error("Los datos obtenidos no son un array:", categoria);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_DEV + "/producto/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProducto),
      });

      if (response.ok) {
        const data = await response.json();

        // Restablecer los valores del formulario
        setNombre("");
        setMedida("");
        setCategoria("");
        setCantidadIngresada("");
        setCostoXunidad("");
        setPrecioVenta("");
        setCodigoBarra("");
        setSuccess("El producto se ha agregado con éxito 😊");
      } else {
        throw new Error("Error al enviar la solicitud 😞");
      }
    } catch (error) {
      console.error(error);
      setError("Error al crear el producto 😞");
    }
  };

  return (
    <>
      <h1 className="h1-titulo">Registra tu nuevo producto</h1>
      <form onSubmit={handleSubmit} className="form-container" method="POST">
        <label className="input-label nombre">
          Nombre
          <input
            className="input nombre-producto"
            placeholder="Ingresa el nombre del producto"
            type="text"
            value={nombre}
            required
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label className="input-label codigoBarra">
          Código de Barras
          <input
            type="number"
            className="input "
            required
            min={1}
            value={codigoBarra}
            onChange={(e) => setCodigoBarra(e.target.value)}
          />
        </label>

        <label className="input-label medida">
          Medida
          <select
            value={medida}
            required
            onChange={(e) => {
              setMedida(e.target.value);
            }}
            className="select-box "
          >
            {dataMedida.map((medidaValue, index) => (
              <option key={index} value={medidaValue} className="opcion-input">
                {medidaValue}
              </option>
            ))}
          </select>
        </label>

        <label className="input-label categoria">
          Categoría
          <select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
            className="select-box "
          >
            {dataCategoria.map((categoriaValue, index) => (
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

        <label className="input-label cantidad">
          Cantidad
          <input
            className="input "
            type="number"
            min={1}
            required
            value={cantidadIngresada}
            onChange={(e) => setCantidadIngresada(e.target.value)}
          />
        </label>

        <label className="input-label costoUnidad">
          Costo por Unidad/Kg
          <input
            className="input "
            type="number"
            min={1}
            required
            value={costoXunidad}
            onChange={(e) => setCostoXunidad(e.target.value)}
          />
        </label>

        <label className="input-label precioVenta">
          Precio de Venta
          <input
            className="input "
            type="number"
            min={1}
            required
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
          />
        </label>
        <div>
          <button type="submit" className="button">
            Crear Producto
          </button>
        </div>
        {error && <p className="error-crear-producto mensaje">{error}</p>}
        {success && (
          <p className="mensaje-producto-creado mensaje">{success}</p>
        )}
      </form>
    </>
  );
};

export default CrearProductoForm;
