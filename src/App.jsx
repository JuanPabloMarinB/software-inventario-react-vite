import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
  useParams,
} from "react-router-dom";
import TablaProductos from "./paginas/TablaProductos";
import MenuLateral from "./paginas/MenuLateral";
import "./styles/App.css";
import Ajustes from "./paginas/Ajustes";
import AgrearProducto from "./paginas/AgrearProducto";
import Ventas from "./componentes/TarjetaVenta";
import FormularioFacturas from "./componentes/FormularioFacturas";
import DetallesFacturaDeVenta from "./paginas/DetallesFacturaDeVenta";
import { useGetVentas } from "./hooks/useVentas";

export default function App() {
  const {
    isLoading: isLoadingVenta,
    data: ventas,
    isError: isErrorVenta,
    error: errorVenta,
  } = useGetVentas();
  if (isLoadingVenta) return <div>Cargando...</div>;
  else if (isErrorVenta) return <div>Error: {errorVenta.message}</div>;
  return (
    <HashRouter>
      <div className="app-container">
        <MenuLateral />
        <div className="main-content">
          <Routes>
            <Route path="/facturador" element={<FormularioFacturas />} />
            <Route path="/ventas" element={<Ventas ventas={ventas} />} />
            <Route
              path="/ventas/:id"
              element={<DetallesFacturaDeVenta ventas={ventas} />}
            />
            <Route path="/agregar-productos" element={<AgrearProducto />} />
            <Route path="/ver-productos" element={<TablaProductos />} />
            <Route path="/ajustes" element={<Ajustes />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}
