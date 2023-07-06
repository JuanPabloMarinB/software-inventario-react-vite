import React from "react";
import imagen from "../images/img-form-agregar-producto.jpg";

export default function ImagenFormCrearProducto() {
  return (
    <>
      <div className="img-container">
        <img src={imagen} alt="" className="imagen-formulario" />
      </div>
    </>
  );
}
