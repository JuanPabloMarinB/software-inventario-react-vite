import React from "react";
import CrearProductoForm from "../componentes/FormularioCrearProducto";
import ImagenFormCrearProducto from "../componentes/ImagenFormCrearProducto";

export default function AgrearProducto() {
  return (
    <section className="seccion-derecha">
      <section className="seccion-der-a">
        <CrearProductoForm />
      </section>
      <section className="seccion-der-b">
        <ImagenFormCrearProducto />
      </section>
    </section>
  );
}
