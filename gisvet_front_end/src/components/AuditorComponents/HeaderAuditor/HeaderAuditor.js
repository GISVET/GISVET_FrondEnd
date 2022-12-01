import React, { useState } from "react";
import Main_logo from "./images/Proyecto_Logo_GisVet.png";
import MenuUser from "components/UserComponents/UserOptions/index";
import { Menubar } from "primereact/menubar";
import { getItemsAuditor } from "constants/menuConstants";
import logo_user from "./images/Icon_Username.png";
import {useLocation } from "wouter"

import styles from "./styles.module.css";
import "./pathImages.css"


export default function HeaderAuditor() {
  const [showMenuUser, setShowMenuUser] = useState(false);
  const [,navigate] = useLocation()

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

  return (
    <div className={styles.header_admin}>
      <Menubar model={getItemsAuditor(navigate)} start={start} end={end} />
      {showMenuUser && <MenuUser></MenuUser>}
      </div>
  );
}
