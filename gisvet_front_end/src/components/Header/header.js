import React from "react";
import { Link, link } from "wouter";
import logo_products from './images/Icon_Products.png'
import logo_dependency from './images/Icon_Dependency.png'
import logo_users from './images/Icon_Users.png'
import logo_patients from './images/Icon_Patients.png'
import logo_user from './images/Icon_Username.png'
import Main_logo from "./images/Proyecto_Logo_GisVet.png"
import useUser from "../../hooks/useUser";
import './styles.css';



export default function Header() {
    const {islogged, login, logout} = useUser();

  return (
    <nav className="nav-bar">
      <ul>
        <img src={Main_logo} width="70" height="70" />
        <li>
            <img src={logo_products} width="45" height="45" />
            Productos
        </li>
        <li>
            <img src={logo_dependency} width="45" height="45" />
            Dependencias
        </li>
        <li>
            <img src={logo_users} width="45" height="45" />
            Usuarios
        </li>
        <li>
            <img src={logo_patients} width="45" height="45" />
            Pacientes
        </li>
        <li className="username_menu">
            <Link to="/admin">
            Username
            </Link>
            <img src={logo_user} width="45" height="45" />
        </li>
      </ul>
    </nav>
  );
}