import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import TablaProductos from "./paginas/TablaProductos";
import MenuLateral from "./paginas/MenuLateral";
import "./styles/App.css";
import Ajustes from "./paginas/Ajustes";
import AgrearProducto from "./paginas/AgrearProducto";
import FormularioFacturas from "./componentes/FormularioFacturas";
import ComponentePadre from "./componentes/ComponentePadre";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <MenuLateral />
        <div className="main-content">
          <Routes>
            <Route path="/ver-productos" element={<TablaProductos />} />
            <Route path="/ajustes" element={<Ajustes />} />
            <Route path="/agregar-productos" element={<AgrearProducto />} />
            <Route path="/facturador" element={<FormularioFacturas />} />
            <Route path="/" element={<ComponentePadre />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
