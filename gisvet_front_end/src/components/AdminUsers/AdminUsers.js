import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import styles from './styles.module.css';
import icon_Filter from "./images/Icon_Filter.png"
import SettingsAdminUser from "../SettingsAdminUser/index";
import {useUsersAdmin} from "../../hooks/useAdminUsers";
import { Modal } from "../../components/Modal/Index"; 
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
        <div className={styles.general_users}>
            <h1>Gestión de Usuarios</h1>
                <div className={styles.table_users}>
                    <div className={styles.filter_users}>
                        <PanelSearch onSubmit={search}/>
                        <div className={styles.buscador}>
                            <select placeholder="Filtrar" 
                                    type="text" 
                                    className={styles.buscar}>
                            </select>
                            <select placeholder="Filtrar" 
                                    type="text" 
                                    className={styles.buscar}>
                            </select>
                            <input type="image" 
                                    src={icon_Filter} 
                                    className={styles.image_buscar}/>
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