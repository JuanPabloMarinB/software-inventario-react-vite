import React, { useEffect, useState, useCallback } from "react";
import "../styles/facturaStyle.css";
import BuscarProductoFactura from "./BuscarProductoFactura";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registrarVenta } from "../hooks/useVentas";
import { BuscarProductoFacturaDos } from "./BuscarProductoFacturaDos";

export default function FormularioFacturas() {
  const [productos, setProductos] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);
  const [productosComprados, setProductosComprados] = useState([]);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeExitoVisible, setMensajeExitoVisible] = useState(false);
  const [efectivo, setEfectivo] = useState(0);
  const [cambio, setCambio] = useState(0);

  const defaultValue = { label: "Nombre o Código de Barras", value: "empty" };

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const handleProductoSeleccionado = (producto) => {
    actualizarProductos(producto);
  };

  const botonCompraHabilitado = () => {
    return totalCompra <= efectivo && totalCompra !== 0;
  };

  const handleClickAceptarVentaRealizada = () => {
    setMensajeExitoVisible(false);
  };

  useEffect(() => {
    setCambio(efectivo - totalCompra);
  }, [totalCompra, efectivo]);

  useEffect(() => {
    const nuevoTotalCompra = productosComprados.reduce(
      (total, producto) => total + producto.subtotal,
      0
    );
    setTotalCompra(nuevoTotalCompra);
  }, [productosComprados]);

  const ventaEfectuada = {
    productos: productosComprados
      .filter((producto) => producto.cantidad > 0)
      .map((producto) => ({
        codigoBarra: producto.codigoBarra,
        nombre: producto.nombre,
      })),
    efectivo: efectivo,
    cantidadVenta: productosComprados
      .filter((producto) => producto.cantidad > 0)
      .map((producto) => producto.cantidad),
  };
  

  const handleClickAceptar = () => {
    setMensajeVisible(true);
  };

  const handleClickCancelar = () => {
    setMensajeVisible(false);
  };

  const handleAnimationEnd = () => {
    if (!mensajeVisible) {
      setMensajeVisible(true);
      setMensajeVisible(false);
    }
  };

  const queryClient = useQueryClient();

  const { mutate: registrarVentaMutation } = useMutation(registrarVenta, {
    onSuccess: () => {
      queryClient.invalidateQueries("ventas");
      setMensajeVisible(false);
      setMensajeExitoVisible(true);
      console.log(ventaEfectuada);
    },
  });

  const actualizarProductos = (producto) => {
    const productoExistente = productosComprados.find(
      (p) => p.id === producto.id
    );
  
    if (productoExistente) {
      // Aumentar la cantidad del producto existente en 1
  
      let nuevaCantidad;
      if (productoExistente.cantidad < productoExistente.cantidadActual) {
        nuevaCantidad = productoExistente.cantidad + 1;
      } else {
        nuevaCantidad = productoExistente.cantidadActual;
      }
      actualizarCantidadProducto(productoExistente.id, nuevaCantidad);
    } else {
      // Agregar el producto a productosComprados
      const subtotal = producto.cantidadActual > 0 ? producto.precioVenta * 1 : 0; // Cálculo correcto del subtotal
      const productoConCantidad = {
        ...producto,
        cantidad: producto.cantidadActual > 0 ? 1 : 0,
        subtotal: subtotal,
        seleccionado: true,
      };
      setProductosComprados((prevProductos) => [
        ...prevProductos,
        productoConCantidad,
      ]);
    }
  
    // Agregar el producto a productosSeleccionados
    setProductosSeleccionados((prevProductos) => [...prevProductos, producto]);
  };
  

  const devolverProducto = useCallback(
    (producto) => {
      setProductosComprados((prevProductos) =>
        prevProductos.filter((p) => p.id !== producto.id)
      );
      setProductosSeleccionados((prevProductos) =>
        prevProductos.filter((p) => p.id !== producto.id)
      );
    },
    [productosComprados, productosSeleccionados]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      registrarVentaMutation(ventaEfectuada);
      setEfectivo(0); // Restablecer el valor de efectivo a 0 para vaciar el campo
      setProductosComprados([]); // Vaciar la tabla
      setProductosSeleccionados([]); // Vaciar la tabla
      console.log();
    },
    [ventaEfectuada, registrarVentaMutation]
  );

  const actualizarCantidadProducto = (id, cantidad) => {
    setProductosComprados((prevProductos) => {
      const newProductos = prevProductos.map((producto) => {
        if (producto.id === id) {
          return {
            ...producto,
            cantidad: cantidad,
            subtotal: producto.precioVenta * cantidad,
          };
        }
        return producto;
      });

      const nuevoTotalCompra = newProductos.reduce(
        (total, producto) => total + producto.subtotal,
        0
      );
      setTotalCompra(nuevoTotalCompra);

      return newProductos;
    });
  };

  const aumentarCantidadProducto = (id) => {
    setProductosComprados((prevProductos) => {
      const newProductos = prevProductos.map((producto) => {
        if (producto.id === id && producto.cantidad < producto.cantidadActual) {
          return {
            ...producto,
            cantidad: producto.cantidad + 1,
            subtotal: producto.precioVenta * (producto.cantidad + 1),
          };
        }
        return producto;
      });

      const nuevoTotalCompra = newProductos.reduce(
        (total, producto) => total + producto.subtotal,
        0
      );
      setTotalCompra(nuevoTotalCompra);

      return newProductos;
    });
  };

  const disminuirCantidadProducto = (id) => {
    setProductosComprados((prevProductos) => {
      const newProductos = prevProductos.map((producto) => {
        if (producto.id === id && producto.cantidad > 0) {
          return {
            ...producto,
            cantidad: producto.cantidad - 1,
            subtotal: producto.precioVenta * (producto.cantidad - 1),
          };
        }
        return producto;
      });

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
      const productoEliminado = prevProductos[index];
      const newProductos = [...prevProductos];
      newProductos.splice(index, 1);

      const nuevoTotalCompra = newProductos.reduce(
        (total, producto) => total + producto.subtotal,
        0
      );
      setTotalCompra(nuevoTotalCompra);

      devolverProducto(productoEliminado);

      return newProductos;
    });

    setProductosSeleccionados((prevProductos) =>
      prevProductos.filter((p) => p.id !== productosComprados[index].id)
    );
  };

  const resultadosFiltrados = productos.filter(
    (producto) =>
      !productosSeleccionados.some((p) => p.id === producto.id) &&
      !productosComprados.some((p) => p.id === producto.id) &&
      (!producto.seleccionado || producto.seleccionado === false)
  );

  function formatNumber(number) {
    return number.toLocaleString("es-ES");
  }

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, ""); // Eliminar puntos y cualquier carácter que no sea un número
    setEfectivo(parseInt(value));
  };

  return (
    <div className="container-form-factura">
      <div className="seccion-izq-form form-buscar-producto">
        <h1>Registrar Compra</h1>
        <div className="factura-container">
          <div className="head-registrar-compra">
            <h2>Detalles de Compra</h2>
            <label className="search-producto">
              Buscar Producto
              <BuscarProductoFacturaDos
                defaultValue={defaultValue}
                onProductoSeleccionado={handleProductoSeleccionado}
                actualizarProductos={actualizarProductos}
              />
            </label>
          </div>
          <form onSubmit={handleSubmit} className="form-factura-container">
            <table>
              <thead className="head-form-prod-factura">
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>SubTotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="tbody-productos-seleccionados">
                {productosComprados.map((producto, index) => (
                  <tr key={producto.id} className="tr-form-factura">
                    <td>{producto.codigoBarra}</td>
                    <td>{producto.nombre}</td>
                    <td className="cantidad-producto-form-factura">
                      <a
                        className="disminuir-cantidad-form-factura"
                        onClick={() => disminuirCantidadProducto(producto.id)}
                      >
                        -
                      </a>
                      <input
                        type="number"
                        min={0}
                        max={producto.cantidadActual}
                        value={producto.cantidad}
                        onChange={(e) => {
                          let nuevaCantidad;
                          if (e.target.value === "") {
                            nuevaCantidad = 0;
                          } else if (e.target.value > producto.cantidadActual) {
                            nuevaCantidad = producto.cantidadActual;
                          } else {
                            nuevaCantidad = parseInt(e.target.value);
                          }
                          actualizarCantidadProducto(
                            producto.id,
                            nuevaCantidad
                          );
                        }}
                      />
                      <a
                        className="aumentar-cantidad-form-factura"
                        onClick={() => aumentarCantidadProducto(producto.id)}
                      >
                        +
                      </a>
                    </td>
                    <td>{producto.precioVenta}</td>
                    <td>{producto.subtotal}</td>
                    <td>
                      <a
                        className="eliminar-producto-form-factura"
                        onClick={() => eliminarProducto(index)}
                      >
                        Eliminar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <div
        className={`seccion-der-form ${mensajeVisible ? "with-overlay" : ""}`}
      >
        <div className="total-compra-container">
          <div className="head-registrar-compra2">
            <h2>
              <span className="detalles-compra-valores">Total Compra</span>
            </h2>
          </div>
          <div className="productos-seleccionados-compra">
            <ul>
              {productosComprados
                .filter((producto) => producto.cantidad > 0)
                .map((producto) => (
                  <li
                    key={producto.id}
                    className="producto-seleccionado-individual"
                  >
                    <h5>{producto.nombre} </h5>
                    <h5>Total: $ {producto.cantidad * producto.precioVenta}</h5>
                  </li>
                ))}
            </ul>
          </div>
          <div className="valor-total-compra-container">
            <h2>
              <span className="detalles-compra-valores">Valor Total:</span>
            </h2>
            <h2>$ {totalCompra}</h2>
          </div>
          <div className="valor-total-compra-container">
            <label htmlFor="efectivo">
              <h2>
                <span className="detalles-compra-valores">Efectivo:</span>
              </h2>
            </label>
            <input
              type="text"
              name="efectivo"
              className="input-efectivo"
              required
              value={"$ " + formatNumber(efectivo)}
              onChange={handleInputChange}
            />
          </div>
          <div className="valor-total-compra-container">
            <h2>
              <span className="detalles-compra-valores">Cambio:</span>
            </h2>
            <h2>$ {cambio.toLocaleString()}</h2>
          </div>
          <a
            className={`boton-abrir-mensaje-compartir-compra ${
              botonCompraHabilitado() ? "" : "disabled"
            }`}
            onClick={handleClickAceptar}
          >
            Realizar Venta
          </a>
          <div
            className={`confirmar-compra-container ${
              mensajeVisible ? "visible" : ""
            } ${!mensajeVisible ? "not-active" : ""}`}
            onAnimationEnd={handleAnimationEnd}
          >
            <h2>¿Deseas confirmar la venta?</h2>
            <div className="botones-confirmar-compra-container">
              <a
                className="boton-cancelar-confirmar-compra"
                onClick={handleClickCancelar}
              >
                Cancelar
              </a>
              <a onClick={handleSubmit} className="boton-confirmar-compra">
                Confirmar
              </a>
            </div>
          </div>
          <div
            className={`venta-realizada-exito ${
              mensajeExitoVisible ? "visible" : ""
            } ${!mensajeExitoVisible ? "not-active" : ""}`}
          >
            <h1>La venta se ha realizado con éxito</h1>
            <a
              onClick={handleClickAceptarVentaRealizada}
              className="boton-aceptar-venta-realizada"
            >
              Aceptar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
