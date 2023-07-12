import React from "react";
import ImagenFormCrearProducto from "../componentes/ImagenFormCrearProducto";
import FormularioCrearProducto from "../componentes/FormularioCrearProducto";

export default function AgrearProducto() {
  return (
    <section className="seccion-derecha">
      <section className="seccion-der-a">
        <FormularioCrearProducto />
      </section>
      <section className="seccion-der-b">
        <ImagenFormCrearProducto />
      </section>
    </section>
  );
}
