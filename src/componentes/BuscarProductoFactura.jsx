import { useState, useEffect, useCallback, useRef } from "react";
import "../styles/facturaStyle.css";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProducts } from "../hooks/useProducts";

export default function BuscarProductoFactura({
  actualizarProductos,
  resultados,
  productosSeleccionados,
}) {
  const queryClient = useQueryClient();
  const inputRef = useRef(null);
  const inputElement = useRef(null);

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
    return items.filter((producto) => {
      const nombreIncluido =
        producto.nombre &&
        producto.nombre.toLowerCase().includes(query.toLowerCase());
      const codigoIncluido =
        producto.codigoBarra &&
        producto.codigoBarra.toLowerCase().includes(query.toLowerCase());
      const noEstaEnResultados = !resultados.includes(producto);
      const noEstaSeleccionado = !productosSeleccionados.some(
        (p) => p.id === producto.id
      );
      return (
        (nombreIncluido || codigoIncluido) &&
        noEstaEnResultados &&
        noEstaSeleccionado
      );
    });
  };

  const ref = useRef(null);

  useEffect(() => {
    const productosFiltrados = filtrarProductos(query, productos);
    setResultadosFiltrados(productosFiltrados);
  }, [query, productos, resultados, productosSeleccionados]);

  const handleClickOutside = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setResultadosFiltrados([]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && resultadosFiltrados.length === 1) {
        handleSelectProducto(resultadosFiltrados[0]);
      }
    };

    if (inputElement.current) {
      inputElement.current.addEventListener("keypress", handleKeyDown);
    }

    return () => {
      if (inputElement.current) {
        inputElement.current.removeEventListener("keypress", handleKeyDown);
      }
    };
  }, [resultadosFiltrados, handleSelectProducto]);

 

  return (
    <div className="buscar-producto-factura" ref={ref}>
      <input
        type="text"
        className="input-search-producto"
        placeholder="Nombre o Código de Barras"
        value={query}
        onChange={handleInputChange}
        ref={inputElement}
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
