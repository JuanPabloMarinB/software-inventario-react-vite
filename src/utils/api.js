import moment from "moment";
import "moment/locale/es";

export async function obtenerProductos() {
  try {
    const response = await fetch(API + "/producto");
    const productosObtenidos = await response.json();
    return productosObtenidos;
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
}
export async function obtenerEnums(tipoDeEnum) {
  const response = await fetch(`${API}/enums/${tipoDeEnum}`);
  const enumsObtenidos = await response.json();
  return enumsObtenidos;
}
export async function obtenerVentas() {
  const response = await fetch(`${API}/venta`);
  const ventasObtenidas = await response.json();
  return ventasObtenidas;
}

export async function eliminarProducto(id) {
  try {
    const response = await fetch(`${API}/producto/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }

    // Opcional: Puedes devolver la respuesta JSON si deseas realizar alguna acción adicional con ella
    // const data = await response.json();
    // return data;
  } catch (error) {
    throw error;
  }
}


export const API = "https://apifruver.circuitosinteligentes.com";

export const API_DEV = "http://localhost:3000";

export const CURRENT_DATE = moment().format("DD-MM-YY");
