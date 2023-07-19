import { BiPencil, BiTrash } from "react-icons/bi";
import imagenTuberculos from "../images/Tuberculos.png";
import imagenFrutas from "../images/Frutas.png";
import imagenVerduras from "../images/Verduras.png";
import imagenSalsas from "../images/Salsas.png";
import imagenLacteos from "../images/Lacteos.png";
import imagenHierbas from "../images/Hierbas.png";
import imagenCondimentos from "../images/Condimentos.png";
import imagenLegumbres from "../images/Legumbres.png";

import moment from "moment";
import {
  useGetProducts,
  deleteProduct,
  updateProduct,
} from "../hooks/useProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function ProductosDeTabla() {
  const queryClient = useQueryClient();
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProducts, setEditedProducts] = useState({});
  const [nombreProductoSeleccionado, setNombreProductoSeleccionado] =
    useState();

  const {
    isLoading: isLoadingProducto,
    data: productos,
    isError: isErrorProducto,
    error: errorProducto,
  } = useGetProducts();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const handleDeleteProduct = (productId) => {
    deleteProductMutation.mutate(productId);
  };
  const handleUpdateProduct = (e, producto) => {
    e.preventDefault();

    // Obtener los valores actualizados del producto seleccionado
    const nombreInput = document.getElementById(`nombre-${editingProductId}`);
    const costoInput = document.querySelector(
      `input[name="costoXunidad-${editingProductId}"]`
    );
    const ventaInput = document.querySelector(
      `input[name="precioVenta-${editingProductId}"]`
    );
    const cantidadInput = document.querySelector(
      `input[name="cantidadActual-${editingProductId}"]`
    );

    // Crear un objeto con los datos actualizados
    const updatedProduct = {
      ...producto,
      nombre: nombreInput.value,
      costoXunidad: Number(costoInput.value),
      precioVenta: Number(ventaInput.value),
      cantidadActual: Number(cantidadInput.value),
    };

    // Verificar si hubo cambios en los datos
    const hasChanges =
      JSON.stringify(updatedProduct) !== JSON.stringify(producto);

    if (hasChanges) {
      // Actualizar el producto en el estado o enviarlo a la API
      updateProductMutation.mutate(updatedProduct);
      setEditingProductId(null);
    } else {
      // Si no hay cambios, simplemente cancelar la edición
      setEditingProductId(null);
    }
  };

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
  };

  if (isLoadingProducto) return <div>Cargando...</div>;
  else if (isErrorProducto) return <div>Error: {error.message}</div>;

  return (
    <>
      {productos?.map((producto) => (
        <tr key={producto.id}>
          <td>
            {producto.categoria.toLowerCase() === "tuberculos" && (
              <img src={imagenTuberculos} alt="Imagen.png" />
            )}
            {producto.categoria.toLowerCase() === "frutas" && (
              <img src={imagenFrutas} alt="Imagen.png" />
            )}
            {producto.categoria.toLowerCase() === "hierbas" && (
              <img src={imagenHierbas} alt="Imagen.png" />
            )}
            {producto.categoria.toLowerCase() === "condimentos" && (
              <img src={imagenCondimentos} alt="Imagen.png" />
            )}
            {producto.categoria.toLowerCase() === "salsas" && (
              <img src={imagenSalsas} alt="Imagen.png" />
            )}
            {producto.categoria.toLowerCase() === "legumbres" && (
              <img src={imagenLegumbres} alt="Imagen.png" />
            )}
            {producto.categoria.toLowerCase() === "lacteos" && (
              <img src={imagenLacteos} alt="Imagen.png" />
            )}
            {producto.categoria.toLowerCase() === "verduras" && (
              <img src={imagenVerduras} alt="Imagen.png" />
            )}
          </td>

          <td>
            <label htmlFor={`nombre-${producto.id}`}>
              <input
                type="text"
                defaultValue={producto.nombre}
                className="input-nombre-producto"
                data-id={producto.id}
                name={`nombre-${producto.id}`}
                id={`nombre-${producto.id}`}
                disabled={editingProductId !== producto.id}
              />
            </label>
          </td>
          <td>
            <label htmlFor={`costoXunidad-${producto.id}`}>
              <input
                type="number"
                defaultValue={producto.costoXunidad}
                className="input-costo"
                data-id={producto.id}
                name={`costoXunidad-${producto.id}`}
                disabled={editingProductId !== producto.id}
              />
            </label>
          </td>
          <td>
            <label htmlFor={`precioVenta-${producto.id}`}>
              <input
                type="number"
                defaultValue={producto.precioVenta}
                className="input-venta"
                data-id={producto.id}
                name={`precioVenta-${producto.id}`}
                disabled={editingProductId !== producto.id}
              />
            </label>
          </td>
          <td>
            <label htmlFor={`cantidadActual-${producto.id}`}>
              <input
                type="number"
                defaultValue={producto.cantidadActual}
                className="input-cantidad"
                data-id={producto.id}
                name={`cantidadActual-${producto.id}`}
                disabled={editingProductId !== producto.id}
              />
            </label>
          </td>
          <td>
            {moment(producto.fechaIngreso).format("DD/MM/YYYY - HH:mm") +
              " hrs"}
          </td>
          <td>
            <span>{producto.cantidadActual > 0 ? "✅ Sí" : "🔴 No"}</span>
          </td>
          <td className="acciones-columna">
            {editingProductId === producto.id ? (
              <>
                <a
                  className="btn_save"
                  onClick={(e) => handleUpdateProduct(e, producto)}
                >
                  Guardar
                </a>

                <a className="btn_cancel" onClick={handleCancelEdit}>
                  Cancelar
                </a>
              </>
            ) : (
              <>
                <a
                  className="btn_edit"
                  o
                  onClick={() => handleEditProduct(producto.id)}
                >
                  <BiPencil /> Editar
                </a>
                <a
                  onClick={() => {
                    handleDeleteProduct;
                  }}
                  className="btn_delete"
                >
                  <BiTrash /> Borrar
                </a>
              </>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
