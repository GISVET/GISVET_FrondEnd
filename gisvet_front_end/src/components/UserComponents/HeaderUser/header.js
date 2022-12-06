//=====Importaciones de React ====
import React, {useState } from "react";

//=====Importaciones de estilos ====
import styles from './styles.module.css';
import "./pathImages.css"

//=====Importaciones de imagenes ====
import logo_user from './images/Icon_Username.png'
import Main_logo from "./images/Proyecto_Logo_GisVet.png"

//=====Importaciones de componentes PrimeReact ====
import { Menubar } from "primereact/menubar";

//=====Importaciones de componentes generales ====
import MenuUser from "../UserOptions/index";

//=====Importaciones de hooks ====
import useUser from "hooks/UserHooks/useUser";

//=====Importaciones de enrutamiento ====
import {useLocation } from "wouter"

//=====Importaciones de constantes ====
import { getItemsBodega, getItemsConsultorio, getItemsFarmacia } from "constants/menuConstants";




export default function HeaderUser() {
  const [showMenuUser, setShowMenuUser] = useState(false);
  const [,navigate] = useLocation()
  const {logout, 
    islogged,
    role,
    dependencies,
    rolesUser,
    changeRol,
    changeDependencie,
    dependencieActive, 
    errorMessage} = useUser()

  const showUserOptions = async (event) => {
    event.preventDefault();
    if (showMenuUser) {
      return setShowMenuUser(false);
    } else {
      return setShowMenuUser(true);
    }
  };

  const start = <img alt="logo" src={Main_logo} height="70" width="70"></img>;
  const end = (
    <li className={styles.username_menu} onClick={showUserOptions}>
      Mi cuenta
      <img src={logo_user} width="45" height="45" />
    </li>
  );

  const selectHeadder = ()=>{
    let fuctionToMenu = ()=>{}
    switch (dependencieActive.DEPENDECIE_TYPE) {
      case 'B':
        fuctionToMenu = getItemsBodega(navigate)
        break;
      case 'F':
        fuctionToMenu = getItemsFarmacia(navigate)
        break;
      case 'C':
        fuctionToMenu = getItemsConsultorio(navigate)
        break;
    
      default:
        break;
    }
    return fuctionToMenu
  }

  return (
    <div className={styles.header_admin}>
      <Menubar model={selectHeadder()} start={start} end={end} />
      {showMenuUser && <MenuUser></MenuUser>}
    </div>
  );
}