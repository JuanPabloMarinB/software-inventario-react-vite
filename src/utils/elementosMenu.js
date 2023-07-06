import { BiSolidDashboard, BiLaptop, BiBox, BiExit } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { LiaUsersCogSolid } from "react-icons/lia";


 export const itemsMenuPrincipal = [
    {
      title: "Panel Principal",
      icon: "panel.png",
      componente: BiSolidDashboard,
      link: "/",
    },
    {
      title: "Facturador",
      icon: "facturador.png",
      componente: BiLaptop,
      link: "/facturador",
    },
    {
      title: "Ventas",
      icon: "ventas.png",
      componente: RiMoneyDollarCircleLine,
      link: "/ventas",
    },
  ];
 export const itemsProductos = [
    {
      title: "Agregar Productos",
      icon: "agregar.png",
      componente: IoIosAddCircleOutline,
      link: "/agregar-productos",
    },
    {
      title: "Ver Productos",
      icon: "productos.png",
      componente: BiBox,
      link: "/ver-productos",
    },
  ];
 export const itemsAdmin = [
    {
      title: "Administrar Roles",
      icon: "roles.png",
      componente: LiaUsersCogSolid,
      link: "/administrar-roles",
    },
    {
      title: "Ajustes",
      icon: "ajustes.png",
      componente: AiOutlineSetting,
      link: "/ajustes",
    },
  ];
  export const itemsSesion = [
    {
      title: "Cerrar Sesión",
      icon: "salir.png",
      componente: BiExit,
      link: "/cerrar-sesion",
    },
  ];
