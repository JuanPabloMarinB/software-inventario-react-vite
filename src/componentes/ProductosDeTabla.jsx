import { Suspense } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { API, API_DEV } from "../utils/api";
import imagenPapa from "../images/Papa.png";
import imagenZanahoria from "../images/Zanahoria.webp";
import imagenTomates from "../images/Tomates.png";
import imagenLechuga from "../images/Lechuga.png";
import imagenCilantro from "../images/Cilantro.jpg";
import imagenCebollaLarga from "../images/Cebolla-larga.png";
import imagenCebollaCabezona from "../images/Cebolla-cabezona.png";
import moment from "moment";
import { fetchData } from "../hooks/useFetch";

const apiData = fetchData(API + "/producto");

export default function ProductosDeTabla() {
  const data = apiData.read();

  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
        {data?.map((producto, index) => (
          <tr key={index}>
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
              <a href={"/producto/" + producto.id} className="nombre-producto">
                {producto.nombre}
              </a>
            </td>
            <td>$ {producto.precioVenta}</td>
            <td>{producto.cantidadActual}</td>
            <td>{moment(producto.fechaIngreso).format("DD/MM/YYYY HH:mm") + " hrs"}</td>
            <td>
              <span>{producto.activo ? "✅ Sí" : "🔴 No"}</span>
            </td>
            <td>
              <a href={"/editar/producto/" + producto.id} className="btn_edit">
                <BiPencil />
              </a>
              <a
                href={"/eliminar/producto/" + producto.id}
                className="btn_delete"
              >
                <BiTrash />
              </a>
            </td>
          </tr>
        ))}
      </Suspense>
    </>
  );
}
