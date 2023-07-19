import "../styles/tablaStyle.css";
import ProductosDeTabla from "../componentes/ProductosDeTabla";

const TablaProductos = () => {
  return (
    <section className="seccion-der">
      <div className="head-table-container">
        <div className="input-search-pagina-productos">
          <h1 className="titulo-productos">Productos</h1>
          <input
            type="search"
            placeholder="Busca aquí"
            className="input-busqueda"
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead className="head-table-ver-productos">
            <tr>
              <th className="imagen-columna">Categoría</th>
              <th>Nombre de Producto</th>
              <th>Precio de Compra</th>
              <th>Precio de Venta</th>
              <th>Cantidad Actual</th>
              <th>Fecha de Registro</th>
              <th>En Stock</th>
              <th className="th-acciones-columna" colSpan={2}>Acciones</th>
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
