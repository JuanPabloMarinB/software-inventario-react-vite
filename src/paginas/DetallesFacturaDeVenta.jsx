import React from "react";
import { useParams } from "react-router-dom";
import resultadosVentas from "../mockups/resultadosVentas.json";
import "../styles/detallesFacturaVentaStyle.css";
import moment from "moment";

export default function DetallesFacturaDeVenta({ ventas }) {
  const ventasConAtributos = resultadosVentas;
  const hayVentas = ventasConAtributos?.lenght > 0;
  const { id } = useParams();

  function getVenta(id) {
    return ventas.find((venta) => venta.id.toString() === id);
  }

  const venta = getVenta(id);
  console.log(venta);
  console.log(venta.ventasProductos);

  if (!venta) return <div>No se encontró la venta</div>;

  return (
    <div className="seccion-der">
      <div className="seccion-der-detalle-factura">
        <div className="detalle-factura-container">
          <div className="logo-detalle-factura">
            <h2>Logo de la Empresa</h2>
            <p>Tamaño recomendado 300x90 px</p>
          </div>
          <div className="datos-detalle-factura">
            <h1>Factura N° {venta.ventaFactura}</h1>
            <div className="fecha-detalle-factura">
              <p>
                <span>Fecha:</span>{" "}
                {moment(venta.fechaVenta).format("DD/MM/YY")}
              </p>
              <p>
                <span>Hora:</span> {moment(venta.fechaVenta).format("hh:mm a")}
              </p>
            </div>
          </div>
          <div className="divisor-line"></div>
          <div className="tabla-detalle-factura">
            <table>
              <thead className="head-table-detalle-factura">
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Precio Total</th>
                </tr>
              </thead>
              <tbody>
                {venta.ventasProductos.map((producto) => (
                  <tr key={producto.id} className="tr-table-detalle-factura">
                    <td>{producto.producto.codigoBarra}</td>
                    <td>{producto.producto.nombre}</td>
                    <td>{producto.cantidadVenta}</td>
                    <td>$ {producto.producto.precioVenta}</td>
                    <td>
                      ${" "}
                      {(
                        producto.producto.precioVenta * producto.cantidadVenta
                      ).toLocaleString()}
                    </td>
                    {/* ... Otros detalles del producto */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="divisor-line"></div>
          <div className="total-detalle-factura">
            <h4>
              {" "}
              <span> Subtotal: </span>$ {venta.totalAPagar}{" "}
            </h4>
            <h4>
              {" "}
              <span> Impuestos: </span>$ 0{" "}
            </h4>
            <h4>
              {" "}
              <span> Total: </span>$ {venta.totalAPagar}{" "}
            </h4>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
