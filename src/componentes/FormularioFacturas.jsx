import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../utils/api";
import "../styles/facturaStyle.css";
import BuscarProductoFactura from "./BuscarProductoFactura";

export default function FormularioFacturas() {
  const [productos, setProductos] = useState([]); // Estado de los productos
  const [totalCompra, setTotalCompra] = useState(0);
  const [productosComprados, setProductosComprados] = useState([]);

  const actualizarProductos = (producto) => {
    const productoConCantidad = {
      ...producto,
      cantidad: 1,
      subtotal: producto.precioVenta,
    };
    setProductosComprados([...productosComprados, productoConCantidad]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ventaEfectuada = {
        venta: {
          productos: productosComprados.map((producto) => ({
            nombre: producto.nombre,
            codigoBarra: producto.codigoBarra,
          })),
          efectivo: efectivo,
        },
        cantidadVenta: productosComprados.map((producto) => producto.cantidad),
      };

      const response = await fetch(API_DEV + "/venta/registro-venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaEfectuada),
      });

      if (response.ok) {
        const data = await response.json();

        // Restablecer los valores del formulario
        setProductos([]);
        setTotalCompra(0);
        setProductosComprados([]);
      } else {
        throw new Error("Error al enviar la solicitud 😞");
      }
    } catch (error) {
      console.error(error);
      setError("Error al crear el producto 😞");
    }
  };

  // Función para actualizar la cantidad de un producto y recalcular el subtotal y el total de la compra
  const actualizarCantidadProducto = (index, cantidad) => {
    setProductosComprados((prevProductos) => {
      const newProductos = [...prevProductos];
      const cantidadActual = newProductos[index].cantidadActual;
      const nuevaCantidad = Math.max(0, Math.min(cantidadActual, cantidad));
  
      newProductos[index].cantidad = nuevaCantidad;
      newProductos[index].subtotal = newProductos[index].precioVenta * nuevaCantidad;
  
      const nuevoTotalCompra = newProductos.reduce(
        (total, producto) => total + producto.subtotal,
        0
      );
      setTotalCompra(nuevoTotalCompra);
  
      return newProductos;
    });
  };
  

  const eliminarProducto = (index) => {
    setProductosComprados((prevProductos) => {
      const newProductos = [...prevProductos];
      newProductos.splice(index, 1);

      // Calcular el nuevo total de la compra
      const nuevoTotalCompra = newProductos.reduce(
        (total, producto) => total + producto.subtotal,
        0
      );
      setTotalCompra(nuevoTotalCompra);

      return newProductos;
    });
  };

  


  return (
    <div className="container-form-factura">
      <div className="seccion-izq-form form-buscar-producto">
        <h1>Registrar Compra</h1>
        <div className="factura-container">
          <div className="head-regitrar-compra">
            <h2>Detalles de Compra</h2>
            <label className="search-producto">
              Buscar Producto
              <BuscarProductoFactura
                actualizarProductos={actualizarProductos}
              />
            </label>
          </div>
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="form-factura-container"
          >
            <table>
              <thead className="head-form-prod-factura">
                <tr>
                  <th>producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>SubTotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosComprados.map((producto, index) => (
                  <tr key={producto.id} className="tr-form-factura">
                    <td>{producto.nombre}</td>
                    <td className="cantidad-producto-form-factura">
                      <button
                        className="disminuir-cantidad-form-factura"
                        onClick={() => {
                          const nuevaCantidad = producto.cantidad - 1;
                          actualizarCantidadProducto(index, nuevaCantidad);
                        }}
                        disabled={producto.cantidad === 0}
                      >
                        -
                      </button>
                      <span>{producto.cantidad}</span>
                      <button
                        className="aumentar-cantidad-form-factura"
                        onClick={() => {
                          const nuevaCantidad = producto.cantidad + 1;
                          actualizarCantidadProducto(index, nuevaCantidad);
                        }}
                        disabled={producto.cantidad === producto.cantidadActual}
                      >
                        +
                      </button>
                    </td>
                    <td>{producto.precioVenta}</td>
                    <td>{producto.subtotal}</td>
                    <td>
                      <button
                        className="eliminar-producto-form-factura"
                        onClick={() => eliminarProducto(index)}
                      >
                        X Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <div className="seccion-der-form">
        <div className="total-compra-container">
          <div className="head-regitrar-compra2">
            <h2>Total Compra</h2>
          </div>
          <div className="productos-compra">
            <h3>Productos:</h3>
            <ul>
              {productosComprados
                .filter((producto) => producto.cantidad > 0)
                .map((producto) => (
                  <li key={producto.id}>
                    {producto.nombre} - Total: $
                    {producto.cantidad * producto.precioVenta}
                  </li>
                ))}
            </ul>
          </div>
          <h3>Total de la compra: ${totalCompra}</h3>
          <div className="total-compra"></div>
        </div>
      </div>
    </div>
  );
}
