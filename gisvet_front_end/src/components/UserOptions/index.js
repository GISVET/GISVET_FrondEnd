import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import Icon_Username from  "./images/Icon_Username_Option.png"
import useUser from "hooks/useUser";
import {useLocation } from "wouter";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


let items = [
    {
        label: 'Roles',
        items: [{label: 'New', icon: 'pi pi-fw pi-plus',command:()=>{ window.location.hash="/fileupload"; }},
                {label: 'Delete', icon: 'pi pi-fw pi-trash', url: 'http://primetek.com.tr'}]
    },
    {
        label: 'Dependencias',
        items: [{label: 'Options', icon: 'pi pi-fw pi-cog',command:()=>{ window.location.hash="/"; }},
                {label: 'Sign Out', icon: 'pi pi-fw pi-power-off'} ]
    }
]



export default function MenuUser(){
    const {logout, 
           islogged,
           role,
           dependencies,
           dependencieActive, 
           errorMessage} = useUser()
    const [,navigate] = useLocation()
    const menu = useRef(null);
    const toast = useRef(null);


    useEffect(()=>{
        if (!islogged) navigate("/")
     },[islogged, navigate])

     const handleSubmit = async(event) =>{
        event.preventDefault();
        logout();
    };

    return (
        <div className={styles.username_option}> 
            <Toast ref={toast}></Toast>
            <img src={Icon_Username} width="200" height="150"/> 
            <label>{role}</label>
            <ul>
            <Menu model={items} popup ref={menu} />
            <Button label="Show" icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)}/>    
                <li><a>Perfil</a></li>
                <li><a>Configuración</a></li>
                <li><a onClick={handleSubmit}>Cerrar sesión</a></li>
            </ul>
        </div>
    )

}