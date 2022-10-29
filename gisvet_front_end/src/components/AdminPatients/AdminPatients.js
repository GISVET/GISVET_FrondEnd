import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import './styles.css';
import icon_Search from  "./images/Icon_Search.png"
import icon_Filter from "./images/Icon_Filter.png"
import {useAdminPatients} from "../../hooks/useAdminPatients";
import SettingsAdminPatients from "../SettingsAdminPatients";



export default function AdminPatients(){
    const {loading, patients,headers} = useAdminPatients()
    return (
        <div className="general-users">
            <h1>Gestión de Pacientes</h1>
                <div className="table-users">
                <div className="filter-users">
                        <div className="buscador">
                                <input className="buscar" placeholder="Buscar" type="text" />
                                <input className="image_buscar" type="image" src={icon_Search} />
                        </div>
                        <div className="buscador">
                        <select placeholder="Filtrar" type="text" className="buscar"></select>
                            <select placeholder="Filtrar " type="text" className="buscar"></select>
                            <input type="image" src={icon_Filter} className="image_buscar"/>
                        </div>
                    </div>

                <Table headers={headers} data={patients}/>  
                <SettingsAdminPatients/> 
            </div>
        </div>
    )

}