import "../styles/facturaStyle.css";
import React, { useState } from "react";
import { BuscarProductoFacturaDos } from "./BuscarProductoFacturaDos";

export const FormularioFacturasDos = () => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const handleProductoSeleccionado = (producto) => {
    setProductosSeleccionados([...productosSeleccionados, producto]);
  };

  return (
    <div>
      <BuscarProductoFacturaDos
        onProductoSeleccionado={handleProductoSeleccionado}
      />
      <table>
        <thead className="head-form-prod-factura">
          <tr>
            <th>Nombre</th>
            <th>Código de Barras</th>
          </tr>
        </thead>
        <tbody>
          {productosSeleccionados.map((producto) => (
            <tr key={producto.id} className="tr-form-factura">
              <td>{producto.nombre}</td>
              <td>{producto.codigoBarra}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
