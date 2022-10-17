import React, { useEffect, useState } from "react";
import './styles.css';
import icon_Settings from "./images/Icon_Settings.png"
import icon_Add_User from "./images/Icon_Add_User.png"
import { Modal } from "../../components/Modal/Index"; 
import AdminUser from "../../components/AddUser";


export default function SettingsAdminUser(){
    const [activeMenu, setActiveMenu] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const setVisibleMenu = async(event) =>{
        event.preventDefault();
        activeMenu?setActiveMenu(false):setActiveMenu(true)
    }

    const showAddUserMenu = async(event) =>{
        event.preventDefault();
        return setShowModal(true)
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
    }

    if (!activeMenu) {
        return (<div className="options-admin" >
                    <input type="image"  onClick={setVisibleMenu} src={icon_Settings} width="45" height="45s"/>
                </div>
        )
    }else{
        return (<>
                    <div className="options-admin-visible" >
                        <input className="settings-hide" type="image" onClick={setVisibleMenu} src={icon_Settings} width="45" height="45"/>
                        <input className="add_user_form" type="image" onClick={showAddUserMenu} src={icon_Add_User} width="45" height="45"/>
                    </div>
                    {showModal && <Modal><AdminUser onClose={handleCloseModal} /></Modal>
                    }
                </>
        )
    }

}