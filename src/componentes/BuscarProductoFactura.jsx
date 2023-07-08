import { useState, useEffect, useCallback } from "react";
import "../styles/facturaStyle.css";
import { obtenerProductos } from "../utils/api";

const filtrarProductos = (query, items) => {
  if (!query) {
    return [];
  }
  return items.filter((producto) =>
    producto.nombre.toLowerCase().includes(query.toLowerCase())
  );
};

export default function BuscarProductoFactura({ actualizarProductos }) {
  const [query, setQuery] = useState("");
  const [productos, setProductos] = useState([]);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    obtenerProductos()
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  useEffect(() => {
    const productosFiltrados = filtrarProductos(query, productos);
    setResultados(productosFiltrados);
  }, [query, productos]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectProducto = useCallback(
    (producto) => {
      actualizarProductos(producto);
      setQuery("");
      setResultados([]);
    },
    [actualizarProductos]
  );

  return (
    <div className="buscar-producto-factura">
      <input
        type="text"
        className="input-search-producto"
        placeholder="Nombre o Código de Barras"
        value={query}
        onChange={handleInputChange}
      />
      {resultados.length > 0 && (
        <ul className="resultados-busqueda">
          {resultados.map((producto) => (
            <li
              className="li-resultados-productos"
              key={producto.id}
              onClick={() => handleSelectProducto(producto)}
            >
              {producto.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
