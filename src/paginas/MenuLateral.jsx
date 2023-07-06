import React, { useState, useEffect } from "react";
import Logo from "/Logo.png";
import "../styles/menuStyle.css";
import {
  itemsMenuPrincipal,
  itemsProductos,
  itemsAdmin,
  itemsSesion,
} from "../utils/elementosMenu";
import LinkMenu from "../componentes/LinkMenu";

const MenuLateral = () => {
  return (
    <>
      <aside className="sidebar-menu">
        <img src={Logo} alt="" className="logo" />
        <div>
          <LinkMenu
            tituloSeccion="Menú Principal"
            arrayItems={itemsMenuPrincipal}
          />
          <div>
            <LinkMenu tituloSeccion="Productos" arrayItems={itemsProductos} />
          </div>
          <div>
            <LinkMenu tituloSeccion="Admin" arrayItems={itemsAdmin} />
          </div>
        </div>
        <LinkMenu tituloSeccion="" arrayItems={itemsSesion} />
      </aside>
    </>
  );
};

export default MenuLateral;
