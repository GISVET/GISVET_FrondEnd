import React from "react";
import { Link, link } from "wouter";
import logo_products from './images/Icon_Products.png'
import logo_dependency from './images/Icon_Dependency.png'
import logo_users from './images/Icon_Users.png'
import logo_patients from './images/Icon_Patients.png'
import logo_user from './images/Icon_Username.png'
import useUser from "../../hooks/useUser";



export default function Header() {
    const {islogged, login, logout} = useUser();

  return (
    <nav class="nav-bar">
      <ul>
        <img src="./images/Proyecto_Logo_GisVet.png" width="70" height="70" />
        <li>
          <a href="">
            <img src={logo_products} width="45" height="45" />
            Productos
          </a>
        </li>
        <li>
          <a href="">
            <img src={logo_dependency} width="45" height="45" />
            Dependencias
          </a>
        </li>
        <li>
          <a href="">
            <img src={logo_users} width="45" height="45" />
            Usuarios
          </a>
        </li>
        <li>
          <a href="">
            <img src={logo_patients} width="45" height="45" />
            Pacientes
          </a>
        </li>
        <li class="username_menu">
          <a>
            <Link to="/admin">
            Username
            </Link>
            <img src={logo_user} width="45" height="45" />
          </a>
        </li>
      </ul>
    </nav>
  );
}