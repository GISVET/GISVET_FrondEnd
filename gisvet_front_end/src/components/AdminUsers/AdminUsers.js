import React, { useEffect, useState } from "react";
import Header from "../HeaderAdmin/header";
import Table from "../Table/Table";
import './styles.css';
import icon_Filter from "./images/Icon_Filter.png"
import SettingsAdminUser from "../SettingsAdminUser/index";
import {useUsersAdmin} from "../../hooks/useAdminUsers";
import { Modal } from "../../components/Modal/Index"; 
import AddUser from "../../components/AddUser";
import ShowUser from "../../components/ShowUser";
import PanelSearch from "../../components/PanelSearch";



export default function AdminUser(){
    const {loading, users,listUserToTable,headers} = useUsersAdmin()
    const [showModal, setShowModal] = useState(false)
    const [childModal, setchildModal] = useState(<></>)

    const showUserMenu = async(identifier) =>{
        setShowModal(true)
        setchildModal(<ShowUser
            id={identifier}
            onClose={handleCloseModal} 
            onSubmit={handleCloseModal} 
           />) 
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
    }
    const search = function(Keyword){
        console.log(Keyword+' a buscar')
    }





    return (<>
        <div className="general-users">
            <h1>Gestión de Usuarios</h1>
                <div className="table-users">
                    <div className="filter-users">
                        <PanelSearch onSubmit={search}/>
                        <div className="buscador">
                        <select placeholder="Filtrar" type="text" className="buscar"></select>
                            <select placeholder="Filtrar" type="text" className="buscar"></select>
                            <input type="image" src={icon_Filter} className="image_buscar"/>
                        </div>
                    </div>

                <Table headers={headers} 
                        data={listUserToTable}
                        keyName={'document'}
                        actionItem={showUserMenu}
                        />  
                <SettingsAdminUser /> 
            </div>
        </div>
        {showModal && <Modal>{childModal}</Modal>
                        
        }
    </>
    )

}