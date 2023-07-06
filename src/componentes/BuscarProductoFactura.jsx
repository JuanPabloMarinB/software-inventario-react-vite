import { useState } from "react";
import {} from "../styles/buscarProductoFactura.css";
import { obtenerProductos } from "../utils/api";

const filtrarProductos = (query, items) => {
  if (!query) {
    return items;
  }
  return items.filter((producto) => producto.nombre.includes(query));
};

export default function BuscarProductoFactura() {
  const [query, setQuery] = useState("");
  
  obtenerProductos



  return <div>BuscarProductoFactura</div>;
}
