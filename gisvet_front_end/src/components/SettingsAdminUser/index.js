import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import icon_Settings from "./images/Icon_Settings.png"
import icon_Add_User from "./images/Icon_Add_User.png"
import icon_asign_dependencie from "./images/Icon_pase_seguridad.png"
import { Modal } from "../../components/Modal/Index"; 
import AdminUser from "../../components/AddUser";
import AssignDependency from "../../components/AssignDependency";
import {useLocation } from "wouter"
import { useUsersAdmin } from "../../hooks/useAdminUsers";
import MessageConfirm from "../../components/MessageConfirm";


export default function SettingsAdminUser(){
    const [activeMenu, setActiveMenu] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [childModal, setchildModal] = useState(<></>)
    const [,navigate] = useLocation()
    const {loading,addUser} = useUsersAdmin()
    

    const setVisibleMenu = async(event) =>{
        event.preventDefault();
        activeMenu?setActiveMenu(false):setActiveMenu(true)
    }

    const showAddUserMenu = async(event) =>{
        event.preventDefault();
        setShowModal(true)
        setchildModal(<AdminUser
            onClose={handleCloseModal} 
            onSubmit={onsubmitAddUser} 
           />)
    }

    
    const showAssignMenu = async(event) =>{
        event.preventDefault();
        setShowModal(true)
        setchildModal(<AssignDependency
            onClose={handleCloseModal} 
            onSubmit={onsubmitAssignDependency} 
           />) 
    }
    

    const handleCloseModal = ()=>{
        setShowModal(false)
    }

    const onsubmitAddUser = (dataForm)=>{
        addUser(dataForm).then(res =>{
            console.log('esta es loa que llega')
            console.log(res)
            setchildModal(<MessageConfirm
                onClose={handleCloseModal} 
                isCorrect= {res.message}
                message={res.status == 200?true:false}
               />) 
    
            setShowModal(false)
        })
       
    }

    const onsubmitAssignDependency = (dataForm)=>{
        addUser(dataForm)
    }

    const closeModal = ()=>{
        setShowModal(false)
    }


    if (!activeMenu) {
        return (<div className={styles.options_admin} >
                    <input type="image"  
                            onClick={setVisibleMenu} 
                            src={icon_Settings} 
                            width="45"
                            height="45"/>
                </div>
        )
    }else{
        return (<>
                    <div className={styles.options_admin_visible} >
                        <input className={styles.settings_hide} 
                                type="image" 
                                onClick={setVisibleMenu} 
                                src={icon_Settings} 
                                width="45" 
                                height="45"/>

                        <div className={styles.item_floatMenu}>
                            <input className={styles.add_user_form} 
                                    type="image" 
                                    onClick={showAddUserMenu} 
                                    src={icon_Add_User} 
                                    width="45" 
                                    height="45"/>

                            <p>Agregar</p>
                        </div>
                        
                        <div className={styles.item_floatMenu}>
                            <input className={styles.add_user_form} 
                                    type="image" 
                                    onClick={showAssignMenu} 
                                    src={icon_asign_dependencie} 
                                    width="45" 
                                    height="45"/>
                                    
                            <p>Assignar</p>
                        </div>

                        
                    </div>
                    {showModal && <Modal>{childModal}</Modal>
                        
                    }
                </>
        )
    }

}