import React, { useEffect } from "react";
import './styles.css';
import logo from './images/Proyecto_Logo_GisVet.png'
import {useLocation } from "wouter"
import { useState } from 'react';
import useUser from "../../hooks/useUser";
import {loginErrorMessage} from "../../constants/constants";


function  login(){
  

    const {login, islogged, errorMessage} = useUser()
    const [,navigate] = useLocation()

    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const className = (errorMessage!== "" || errorMessage== undefined)?"error-message":"no-error";

    useEffect(()=>{
        if (islogged) navigate("/AdminUser")
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
                  <input className={className} name="username" type="text" onChange={handleInputChange} value={data.username} required='required' placeholder="clinicauptc@uptc.edu.co"/>
                  <h3>Contraseña</h3>
                  <input className={className} name="password" type="password" onChange={handleInputChange} value={data.password} required='required' placeholder="**********" />
                  {
                  (errorMessage!= "" || errorMessage== undefined)&&
                  <h3 className={className}>{loginErrorMessage}</h3>
}
                                   
                  <input type="submit" value="Ingresar"/>
                 
                  <a><h4>¿Olvidaste tu contraseña?</h4></a>
              </form>🎬 
                
            </div>
      </div>    
    )
}

export default login;