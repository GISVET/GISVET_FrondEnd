import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import Table from "../../components/Table/Table";
import './styles.css';
import icon_Search from  "./images/Icon_Search.png"
import icon_Filter from "./images/Icon_Filter.png"
import SettingsAdminUser from "../../components/SettingsAdminUser/index";
import {useUsersAdmin} from "../../hooks/useAdminUsers";



export default function adminPatients(){
    const {loading, users,setUsers,headers,getUsers} = useUsersAdmin()


    return (
        <div className="general-admin">
            <Header />
            <div className="general-users">
            <h1>Gestión de Usuarios</h1>
                <div className="table-users">
                    <div className="filter-users">
                        <div className="buscador">
                                <input type="image" src={icon_Search} className="image_buscar"/>
                                <input placeholder="Buscar" type="text" className="buscar"/>
                        </div>
                        <div className="buscador">
                            <input placeholder="Filtrar" type="text" className="buscar"/>
                            <input type="image" src={icon_Filter} className="image_buscar"/>
                        </div>
                    </div>

                <Table headers={headers} data={users}/>  
                <SettingsAdminUser /> 
            </div>
        </div>
    </div>
    )

}