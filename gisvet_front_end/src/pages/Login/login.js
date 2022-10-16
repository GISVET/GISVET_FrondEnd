import React, { useEffect } from "react";
import './styles.css';
import logo from './images/Proyecto_Logo_GisVet.png'
import {useLocation } from "wouter"
import { useState } from 'react';
import useUser from "../../hooks/useUser";


function login(){
    const {login, islogged, errorMessage} = useUser()
    const [,navigate] = useLocation()

    const [data, setData] = useState({
        username: "",
        password: ""
    });

    useEffect(()=>{
        if (islogged) navigate("/admin")
     },[islogged, navigate])

    const handleInputChange = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData);
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        login(data);
    };
    
    return (
        <div className="general">
          <div className="rigth">
              <div className="logo_div">
                  <img src={logo} alt="Logo GisVet"/>
              </div>
          </div>
          <div className="left">
            <form className="login_div" onSubmit={handleSubmit}>
                  <h3>Correo electrónico</h3>
                  <input name="username" type="text" onChange={handleInputChange} value={data.username} required='required' placeholder="   clinicauptc@uptc.edu.co"/>
                  <h3>Contraseña</h3>
                  <input name="password" type="password" onChange={handleInputChange} value={data.password} required='required' placeholder="   **********" />
                  <input type="submit" value="Ingresar"/>
                 
                  <a><h4>¿Olvidaste tu contraseña?</h4></a>
              </form>
                {
                    
                    (errorMessage!= "" || errorMessage== undefined) &&
                        <strong>{errorMessage}</strong>
                }
            </div>
      </div>    
    )
}

export default login;