import React, { useEffect, useState } from "react";
import Header from "../HeaderAdmin/header";
import Table from "../Table/Table";
import './styles.css';
import icon_Search from  "./images/Icon_Search.png"
import icon_Filter from "./images/Icon_Filter.png"
import {useAdminDependencies} from "../../hooks/useAdminDependencies";
import SettingsAdminDepedencies from "../SettingsAdminDependencies";



export default function AdminDependencies(){

    const [askName,setAskName] = useState();
    const {loading, dependencies,headers,orderDependency,askDependencyName} = useAdminDependencies()



    const showUserMenu = async(identifier) =>{
    }

    const askDependency=()=>{
        askDependencyName(askName);
    }

    const handleName = (event)=>{
        setAskName(event.target.value);
    }

    console.log("Entra en el admin dependencies")
    return (
        <div className="general-users">
            <h1>Gestión de Dependencias</h1>
                <div className="table-users">
                <div className="filter-users">
                        <div className="buscador">
                                <input className="buscar" placeholder="Buscar" onChange={handleName} type="text" />
                                <input className="image_buscar" onClick={askDependency} type="image" src={icon_Search} />
                        </div>
                        <div className="buscador">
                        <select placeholder="Filtrar" type="text" className="buscar"></select>
                            <select placeholder="Filtrar " type="text" className="buscar"></select>
                            <input type="image" src={icon_Filter} className="image_buscar"/>
                        </div>
                    </div>

                <Table headers={headers} data={dependencies}
                        keyName={'id_dependencie'}
                        actionItem={showUserMenu}/>  
                <SettingsAdminDepedencies/> 
            </div>
        </div>
    )

}