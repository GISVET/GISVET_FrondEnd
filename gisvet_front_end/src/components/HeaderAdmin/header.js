import React, { useEffect, useState } from "react";
import { Link, link } from "wouter";
import {useLocation } from "wouter"
import logo_products from './images/Icon_Products.png'
import logo_dependency from './images/Icon_Dependency.png'
import logo_users from './images/Icon_Users.png'
import logo_patients from './images/Icon_Patients.png'
import logo_user from './images/Icon_Username.png'
import Main_logo from "./images/Proyecto_Logo_GisVet.png"
import useUser from "../../hooks/useUser";
import MenuUser from "../UserOptions/index";
import './styles.css';



export default function HeaderAdmin() {
    const {islogged, login, logout} = useUser();
    const [showMenuUser, setShowMenuUser] = useState(false)
    const [,navigate] = useLocation()

    const showUserOptions = async(event) =>{
      event.preventDefault();
      if (showMenuUser){
        return setShowMenuUser(false)
      }else{
        return setShowMenuUser(true)
      }
    }

  return (<>
    <nav className="nav-bar">
      <ul>
        <img src={Main_logo} width="70" height="70" />

        <li onClick={()=>{navigate("/AdminDependencies")}}>
            <img src={logo_dependency} width="45" height="45" />
            Dependencias
        </li>

        <li onClick={()=>{navigate("/AdminUser")}}>
            <img src={logo_users} width="45" height="45" />
            Usuarios
        </li>

        <li onClick={()=>{navigate("/AdminUser")}}>
            <img src={logo_patients} width="45" height="45" />
            Pacientes
        </li>

        <li onClick={()=>{navigate("/AdminUser")}}>
            <img src={logo_products} width="45" height="45" />
            Productos
        </li>

        <li className="username_menu" onClick={showUserOptions}>
            Username
            <img src={logo_user} width="45" height="45" />
        </li>
      </ul>
    </nav>
    {showMenuUser && 
      <MenuUser></MenuUser>
    }
    </>
  );
}