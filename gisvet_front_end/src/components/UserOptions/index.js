import React, { useEffect, useState } from "react";
import './styles.css';
import Icon_Username from  "./images/Icon_Username_Option.png"
import useUser from "../../hooks/useUser";
import {useLocation } from "wouter"



export default function MenuUser(){
    const {logout, islogged, errorMessage} = useUser()
    const [,navigate] = useLocation()


    useEffect(()=>{
        if (!islogged) navigate("/")
     },[islogged, navigate])

     const handleSubmit = async(event) =>{
        event.preventDefault();
        logout();
    };

    return (
        <div className="username_option"> 
            <img src={Icon_Username} width="200" height="150"/> 
            <label>Administrador</label>
            <ul>
                <li><a>Perfil</a></li>
                <li><a>Configuración</a></li>
                <li><a onClick={handleSubmit}>Cerrar sesión</a></li>
            </ul>
        </div>
    )

}