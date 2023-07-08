import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../utils/api";
import "../styles/facturaStyle.css";
import BuscarProductoFactura from "./BuscarProductoFactura";

export default function FormularioFacturas() {
  const [productosComprados, setProductosComprados] = useState([]);

  const actualizarProductos = (producto) => {
    setProductosComprados([...productosComprados, producto]);
  };

  return (
    <div className="container-form-factura">
      <div className="seccion-izq-form form-buscar-producto">
        <h1>Registrar Compra</h1>
        <div className="factura-container">
          <div className="head-regitrar-compra">
            <h2>Detalles de Compra</h2>
            <label className="search-producto">
              Buscar Producto
              <BuscarProductoFactura
                actualizarProductos={actualizarProductos}
              />
            </label>
          </div>
          {/* Resto del código del formulario */}
        </div>
      </div>
      {/* Resto del código del componente */}
    </div>
  );
}
