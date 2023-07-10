import { Suspense, useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { API, API_DEV, eliminarProducto, obtenerProductos } from "../utils/api";
import imagenPapa from "../images/Papa.png";
import imagenZanahoria from "../images/Zanahoria.webp";
import imagenTomates from "../images/Tomates.png";
import imagenLechuga from "../images/Lechuga.png";
import imagenCilantro from "../images/Cilantro.jpg";
import imagenCebollaLarga from "../images/Cebolla-larga.png";
import imagenCebollaCabezona from "../images/Cebolla-cabezona.png";
import moment from "moment";
import { fetchData } from "../hooks/useFetch";

export default function ProductosDeTabla() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    obtenerProductos()
      .then((data) => {
        if (Array.isArray(data)) {
          setData([...data]);
          console.log("Se ejecutó el useEffect");
        } else {
          console.error("Los datos obtenidos no son un array:", data);
        }
      })
      .catch((errorProductos) => {
        console.error("Error al obtener los productos:", errorProductos);
      });
  }, []);

  const handleDeleteButtonClick = async (id) => {
    eliminarProducto(id);
  };

  const handleEditButtonClick = async (productoId, nuevoNombre) => {
    try {
      // Realizar la llamada a la API para guardar el nuevo nombre del producto en la base de datos
      await API_DEV.put(`/producto/${productoId}`, { nombre: nuevoNombre });

      // Deshabilitar el input después de guardar los datos
      setIsDisabled(true);
    } catch (error) {
      // Manejar el error en caso de que la llamada a la API falle
      console.error(error);
    }
  };

  const cambiarDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <>
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
            <input
              type="text"
              disabled={isDisabled}
              defaultValue={producto.nombre}
              className="input-nombre-producto"
            />
          </td>
          <td>$ {producto.costoXunidad}</td>
          <td>$ {producto.precioVenta}</td>
          <td>{producto.cantidadActual}</td>
          <td>
            {moment(producto.fechaIngreso).format("DD/MM/YYYY HH:mm") + " hrs"}
          </td>
          <td>
            <span>{producto.activo ? "✅ Sí" : "🔴 No"}</span>
          </td>
          <td className="acciones-columna">
            <div>
              {isDisabled ? (
                <a onClick={cambiarDisabled} className="btn_edit">
                  <BiPencil /> Editar
                </a>
              ) : (
                <a
                  onClick={() =>
                    handleEditButtonClick(
                      producto.id,
                      document.querySelector(
                        `.input-nombre-producto[data-producto-id="${producto.id}"]`
                      ).value
                    )
                  }
                  className="btn_save"
                >
                  <AiFillCheckCircle /> Guardar
                </a>
              )}
            </div>
            <button
              onClick={() => handleDeleteButtonClick(producto.id)}
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
