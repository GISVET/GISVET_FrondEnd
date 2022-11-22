import React, {useState } from "react";
import logo_user from './images/Icon_Username.png'
import { Menubar } from "primereact/menubar";
import { getItemsBodega, getItemsConsultorio, getItemsFarmacia } from "constants/menuConstants";
import Main_logo from "./images/Proyecto_Logo_GisVet.png"
import MenuUser from "components/UserOptions/index";
import styles from './styles.module.css';
import useUser from "hooks/useUser";
import {useLocation } from "wouter"
import "./pathImages.css"




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
    console.log(`Esta es el tipo weee ${dependencieActive.DEPENDECIE_TYPE}`)
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
    console.log(fuctionToMenu)
    return fuctionToMenu
  }

  return (
    <>
      <Menubar model={selectHeadder()} start={start} end={end} />
      {showMenuUser && <MenuUser></MenuUser>}
    </>
  );
}