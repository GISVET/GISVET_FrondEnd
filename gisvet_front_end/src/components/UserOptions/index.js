import React, { useEffect, useState, useRef  } from "react";
import styles from './styles.module.css';
import Icon_Username from  "./images/Icon_Username_Option.png"
import useUser from "hooks/useUser";
import {useLocation } from "wouter";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


const formatDepencies=(depActual,arrayDep, command)=>{
    let itemsDependencies = { label: 'Dependencias'}
    let itemsAux =[]
    arrayDep.map(item =>{
        if(depActual.ID_DEPENDECIE === item.ID_DEPENDECIE){
            itemsAux.push({
                label: item.DEPENDECIE_NAME,
                icon: selectIcon(item.DEPENDECIE_TYPE),
                disabled: true 
            })
        }else{
            itemsAux.push({
                label: item.DEPENDECIE_NAME,
                icon: selectIcon(item.DEPENDECIE_TYPE),
                command:()=>{ 
                    command(item.ID_DEPENDECIE)
                   
                }
            })
        }
    })
    itemsDependencies['items'] = itemsAux
    return itemsDependencies
}

const formatRoles=(rolActual, arrayRoles, command)=>{
    let itemsRoles = { label: 'Roles'}
    let itemsAux =[]
    arrayRoles.map(item =>{
        if(item.NAME_ROL === rolActual){
            itemsAux.push({
                label: item.NAME_ROL,
                icon: 'pi pi-fw pi-home',
                disabled: true 
            })
        }else{
            itemsAux.push({
                label: item.NAME_ROL,
                icon: 'pi pi-fw pi-users',
                command:()=>{ 
                    command(item.NAME_ROL)
                   
                }
            })
        }
    })
    itemsRoles['items'] = itemsAux
    return itemsRoles
}


const selectIcon= (type_dependencie)=>{
    let iconString= ''
    switch (type_dependencie) {
        case 'B':
            iconString='pi pi-fw pi-box'
            break;
        case 'F':
            iconString='pi pi-fw pi-building'
            break;
        case 'C':
            iconString='pi pi-fw pi-user'
            break;
        default:
            break;
    }
    return iconString

}



export default function MenuUser(){
    const {logout, 
           islogged,
           role,
           dependencies,
           rolesUser,
           changeRol,
           changeDependencie,
           dependencieActive, 
           errorMessage} = useUser()
    const [,navigate] = useLocation()
    const menu = useRef(null);
    const toast = useRef(null);
    console.log(role)

    const dessignMenu=()=>{
        let itemsToShow = []
        itemsToShow.push(formatRoles(role, rolesUser, changeRol))
        if(role === 'Usuario'){
            itemsToShow.push(formatDepencies(dependencieActive,dependencies, changeDependencie))  
        }
        return itemsToShow

    }

    useEffect(()=>{
        if (!islogged) navigate("/")
     },[islogged, navigate])

     const handleSubmit = async(event) =>{
        event.preventDefault();
        logout();
    };

    return (<>
        <Toast ref={toast}></Toast>
        <div className={styles.username_option}> 
            <Menu className={styles.menu_content} model={dessignMenu()} popup ref={menu} id="popup_menu"/>
            <img src={Icon_Username} width="100" height="80"/> 
            <label>{role}</label>
            <ul className={styles.user_menulist}> 
                <li><a>Perfil</a></li>
                <li onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup ><a>Cambiar Rol</a></li>
                <li onClick={handleSubmit}><a >Cerrar sesión</a></li>
            </ul>
        </div>
    </>
    )

}