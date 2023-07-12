import { useState, useEffect, useCallback } from "react";
import "../styles/facturaStyle.css";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProducts } from "../hooks/useProducts";

export default function BuscarProductoFactura({
  actualizarProductos,
  resultados,
  productosSeleccionados,
}) {
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingProducto,
    data: productos,
    isError: isErrorProducto,
    error: errorProducto,
  } = useGetProducts();
  const [query, setQuery] = useState("");

  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);

  const filtrarProductos = (query, items) => {
    if (!query) {
      return [];
    }
    return items.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(query.toLowerCase()) &&
        !resultados.includes(producto) &&
        !productosSeleccionados.some((p) => p.id === producto.id)
    );
  };

  useEffect(() => {
    const productosFiltrados = filtrarProductos(query, productos);
    setResultadosFiltrados(productosFiltrados);
  }, [query, productos, resultados, productosSeleccionados]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectProducto = useCallback(
    (producto) => {
      actualizarProductos(producto);
      setQuery("");
      setResultadosFiltrados((prevResultados) =>
        prevResultados.filter((p) => p.id !== producto.id)
      );
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
      {resultadosFiltrados.length > 0 && (
        <ul className="resultados-busqueda">
          {resultadosFiltrados.map((producto) => (
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
