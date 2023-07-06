import React, { useEffect, useState } from "react";
import {
  API,
  API_DEV,
  CURRENT_DATE,
  obtenerProductos,
  obtenerVentas,
} from "../utils/api";
import "../styles/facturaStyle.css";

export default function FormularioFacturas() {
  const [nombreProducto, setNombreProducto] = useState("");
  const [codigoBarra, setCodigoBarra] = useState("");
  const [efectivo, setEfectivo] = useState("");
  const [cantidadVenta, setCantidadVenta] = useState([]);
  const [dataProductos, setDataProductos] = useState([]);
  const [dataFechaVentasEfectuadas, setDataFechaVentasEfectuadas] = useState(
    []
  );
  const [errorProductos, setErrorProductos] = useState("");
  const [errorFechaVentas, setErrorFechaVentas] = useState("");
  const ventaEfectuada = {
    venta: {
      productos: [
        {
          nombre: nombreProducto,
          codigoBarra: codigoBarra,
        },
      ],
      efectivo: efectivo,
    },
    cantidadVenta: [cantidadVenta],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API + "/venta/registro-venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaEfectuada),
      });

      if (response.ok) {
        const data = await response.json();

        // Restablecer los valores del formulario
        setNombreProducto("");
        setCodigoBarra("");
        setEfectivo("");
        setCantidadVenta("");
      } else {
        throw new Error("Error al enviar la solicitud 😞");
      }
    } catch (error) {
      console.error(error);
      setError("Error al crear el producto 😞");
    }
  };

  useEffect(() => {
    obtenerProductos()
      .then((productos) => {
        if (Array.isArray(productos)) {
          setDataProductos(productos);
        } else {
          console.error("Los datos obtenidos no son un array:", productos);
        }
      })
      .catch((errorProductos) => {
        console.error("Error al obtener los productos:", errorProductos);
      });
  }, []);

  return (
    <div className="seccion-der">
      <h1>Formulario de Factura</h1>
      <div className="factura-container">

      <div className="form-buscar-producto">
        <label htmlFor="">
          Producto
          <input type="text" />
        </label>
      </div>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="form-factura-container"
      >
        <label className="label label-fecha">
          Fecha de Venta
          <input value={CURRENT_DATE} className="input input-fecha" />
        </label>
        <label className="label label-fecha">
          Fecha de Venta
          <input type="date" className="input input-fecha" />
          <input type="date" className="input input-fecha" />
        </label>

        <label className="label">
          Nombre del producto:
          <input
            type="text"
            value={nombreProducto}
            required
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </label>
        <label className="label">
          Código de barras:
          <input
            type="text"
            id="codigoBarra"
            value={codigoBarra}
            required
            onChange={(e) => setCodigoBarra(e.target.value)}
          />
        </label>
        <label className="label">
          Monto en efectivo:
          <input
            type="text"
            value={efectivo}
            required
            onChange={(e) => setEfectivo(e.target.value)}
          />
        </label>
        <label className="label">
          Cantidad de venta:
          <input
            type="text"
            value={cantidadVenta}
            required
            onChange={(e) => setCantidadVenta(e.target.value)}
          />
        </label>
        <button type="submit" className="boton-form-factura">
          Enviar
        </button>
      </form>
      </div>
    </div>
  );
}
