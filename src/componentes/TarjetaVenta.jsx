import React from "react";
import { useGetVentas } from "../hooks/useVentas";
import moment from "moment";
import { NavLink, useParams } from "react-router-dom";
import "../styles/tarjetaVentaStyle.css";

export default function TarjetaVenta({ventas}) {
  const { id } = useParams();

  return (
    <div className="seccion-der">
      <h1 className="titulo-venta">Ventas</h1>
      <div className="seccion-der-tarjeta-venta">
        {ventas?.map((venta) => (
          <NavLink
            to={`/ventas/${venta.id}`}
            key={venta.id}
            className="card-venta-container"
          >
            <div className="head-card-venta">
              <div className="numero-factura-venta">
                <h4>N° de Factura </h4>
                <h4>{venta.ventaFactura}</h4>
              </div>
              <div className="fecha-hora-factura-venta">
                <p>Fecha: {moment(venta.fechaVenta).format("DD/MM/YY")}</p>
                <p>Hora: {moment(venta.fechaVenta).format("hh:mm a")}</p>{" "}
              </div>
            </div>
            <div className="detalles-venta-individual">
              <div className="total-pagar-venta">
                <p className="titulo-total-pagar">Total a pagar </p>
                <p>${venta.totalAPagar.toLocaleString()}</p>
              </div>
              <div>
                <p>
                  <span className="titulo-total-pagar">Efectivo </span>$
                  {venta.efectivo.toLocaleString()}
                </p>
                <p>
                  <span className="titulo-total-pagar">Cambio </span>$
                  {venta.cambio.toLocaleString()}
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
