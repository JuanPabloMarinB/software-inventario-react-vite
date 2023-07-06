import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


export default function LinkMenu(props) {
    const {tituloSeccion, arrayItems} = props;
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  useEffect(() => {
    const activeMenuItemId = localStorage.getItem("activeMenuItem");
    if (activeMenuItemId) {
      setActiveMenuItem(activeMenuItemId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeMenuItem", activeMenuItem);
  }, [activeMenuItem]);

  const handleItemClick = (itemId) => {
    setActiveMenuItem(itemId);
  };
  return (
    <div>
      <h3>{tituloSeccion}</h3>
      <ul>
        {arrayItems.map((item, index) => (
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              isActive ? "icono-nav-menu active" : "icono-nav-menu"
            }
            key={index}
            onClick={() => handleItemClick(item.id)}
          >
            <li className="link">
              <item.componente className="icono" />
              <span>{item.title}</span>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
