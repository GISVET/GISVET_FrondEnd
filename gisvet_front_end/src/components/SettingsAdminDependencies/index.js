import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import icon_Settings from "./images/Icon_Settings.png"
import icon_Add_Dependency from "./images/Icon_Add_Dependency.png"
import { Modal } from "../Modal/Index"; 
import AddDependency from "../AddDependency";
import {useLocation } from "wouter"
import {useAdminDependencies} from "../../hooks/useAdminDependencies";


export default function SettingsAdminDepedencies(){
    const [activeMenu, setActiveMenu] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [,navigate] = useLocation()
    const {loading,addDependency} = useAdminDependencies()
    
    const setVisibleMenu = async(event) =>{
        event.preventDefault();
        activeMenu?setActiveMenu(false):setActiveMenu(true)
    }

    const showAddDependencyMenu = async(event) =>{
        event.preventDefault();
        return setShowModal(true)
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
    }

    const onsubmit = (data)=>{
        addDependency(data)
        setShowModal(false)
    }

    if (!activeMenu) {
        return (<div className={styles.options-admin} >
                    <input type="image"  
                            onClick={setVisibleMenu} 
                            src={icon_Settings} 
                            width="45" 
                            height="45"/>
                </div>
        )
    }else{
        return (<>
                    <div className={styles.options-admin-visible} >
                        <input className={styles.settings-hide} 
                                type="image" 
                                onClick={setVisibleMenu} 
                                src={icon_Settings} 
                                width="45" 
                                height="45"/>
                        <input className={styles.add_user_form} 
                                type="image" 
                                onClick={showAddDependencyMenu} 
                                src={icon_Add_Dependency} 
                                width="40" 
                                height="50"/>
                    </div>
                    {showModal && <Modal><AddDependency
                         onClose={handleCloseModal} 
                         onSubmit={onsubmit} 
                        /></Modal>
                        
                    }
                </>
        )
    }

}