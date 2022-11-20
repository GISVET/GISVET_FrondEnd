import React, { useState } from "react";
import Main_logo from "./images/Proyecto_Logo_GisVet.png";
import MenuUser from "components/UserOptions/index";
import { Menubar } from "primereact/menubar";
import { itemsNav } from "constants/menuConstants";
import logo_user from "./images/Icon_Username.png";

import styles from "./styles.module.css";

import "./header-style.css";

export default function HeaderAdmin() {
  const [showMenuUser, setShowMenuUser] = useState(false);

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
    <>
      <Menubar model={itemsNav} start={start} end={end} />
      {showMenuUser && <MenuUser></MenuUser>}
    </>
  );
}
