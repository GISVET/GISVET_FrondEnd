import React, { useEffect, useState } from "react";
import Header from "../HeaderAdmin/header";
import Table from "../Table/Table";
import './styles.css';
import icon_Search from  "./images/Icon_Search.png"
import icon_Filter from "./images/Icon_Filter.png"
import SettingsAdminUser from "../SettingsAdminUser/index";
import {useUsersAdmin} from "../../hooks/useAdminUsers";
import { Modal } from "../../components/Modal/Index"; 
import AddUser from "../../components/AddUser";
import ShowUser from "../../components/ShowUser";



export default function AdminUser(){
    const {loading, users,headers} = useUsersAdmin()
    const [showModal, setShowModal] = useState(false)
    const [childModal, setchildModal] = useState(<></>)

    const showUserMenu = async(identifier) =>{
        setShowModal(true)
        setchildModal(<ShowUser
            onClose={handleCloseModal} 
            onSubmit={handleCloseModal} 
           />) 
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
    }





    return (<>
        <div className="general-users">
            <h1>Gestión de Usuarios</h1>
                <div className="table-users">
                    <div className="filter-users">
                        <div className="buscador">
                                <input className="buscar" placeholder="Buscar" type="text" />
                                <input className="image_buscar" type="image" src={icon_Search} />
                        </div>
                        <div className="buscador">
                        <select placeholder="Filtrar" type="text" className="buscar"></select>
                            <select placeholder="Filtrar" type="text" className="buscar"></select>
                            <input type="image" src={icon_Filter} className="image_buscar"/>
                        </div>
                    </div>

                <Table headers={headers} 
                        data={users}
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