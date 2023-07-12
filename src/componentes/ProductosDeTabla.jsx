import { Suspense, useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import imagenPapa from "../images/Papa.png";
import imagenZanahoria from "../images/Zanahoria.webp";
import imagenTomates from "../images/Tomates.png";
import imagenLechuga from "../images/Lechuga.png";
import imagenCilantro from "../images/Cilantro.jpg";
import imagenCebollaLarga from "../images/Cebolla-larga.png";
import imagenCebollaCabezona from "../images/Cebolla-cabezona.png";
import moment from "moment";
import { useGetProducts, deleteProduct } from "../hooks/useProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductosDeTabla() {
  const queryClient = useQueryClient();

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

  const handleDeleteProduct = (productId) => {
    deleteProductMutation.mutate(productId);
  };

  if (isLoadingProducto) return <div>Cargando...</div>;
  else if (isErrorProducto) return <div>Error: {error.message}</div>;

  return (
    <>
      {productos?.map((producto) => (
        <tr key={producto.id}>
          <td>
            <a href={"/producto/" + producto.id}>
              {producto.nombre === "Papa" && (
                <img src={imagenPapa} alt="Imagen.png" />
              )}
              {producto.nombre === "Zanahoria" && (
                <img src={imagenZanahoria} alt="Imagen.png" />
              )}
              {producto.nombre === "Tomate" && (
                <img src={imagenTomates} alt="Imagen.png" />
              )}
              {producto.nombre === "Lechuga" && (
                <img src={imagenLechuga} alt="Imagen.png" />
              )}
              {producto.nombre === "Cilantro" && (
                <img src={imagenCilantro} alt="Imagen.png" />
              )}
              {producto.nombre === "Cebolla Larga" && (
                <img src={imagenCebollaLarga} alt="Imagen.png" />
              )}
              {producto.nombre === "Cebolla Cabezona" && (
                <img src={imagenCebollaCabezona} alt="Imagen.png" />
              )}
            </a>
          </td>
          <td>
            <input
              type="text"
              defaultValue={producto.nombre}
              className="input-nombre-producto"
            />
          </td>
          <td>$ {producto.costoXunidad}</td>
          <td>$ {producto.precioVenta}</td>
          <td>{producto.cantidadActual}</td>
          <td>
            {moment(producto.fechaIngreso).format("DD/MM/YYYY - HH:mm") + " hrs"}
          </td>
          <td>
            <span>{producto.activo ? "✅ Sí" : "🔴 No"}</span>
          </td>
          <td className="acciones-columna">
            <button className="btn_edit">
              <BiPencil /> Editar
            </button>
            <button
              onClick={() => {
                handleDeleteProduct(producto.id);
              }}
              className="btn_delete"
            >
              <BiTrash /> Borrar
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
