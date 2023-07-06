import "../styles/tablaStyle.css";
import ProductosDeTabla from "../componentes/ProductosDeTabla";

const TablaProductos = () => {
  return (
    <section className="seccion-der">
      <div className="head-table-container">
        <div className="input-search">
          <h1 className="titulo-productos">Productos</h1>
          <input type="search" placeholder="Busca aquí" className="input-busqueda" />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="imagen-columna">Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Fecha de Registro</th>
              <th>En Stock</th>
              <th className="acciones-columna">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <ProductosDeTabla />
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TablaProductos;
