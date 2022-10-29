import React, { useEffect, useState } from "react";
import './styles.css';
import icon_Settings from "./images/Icon_Settings.png"
import icon_Add_User from "./images/Icon_Add_User.png"
import { Modal } from "../../components/Modal/Index"; 
import AdminUser from "../../components/AddUser";
import {useLocation } from "wouter"
import { useUsersAdmin } from "../../hooks/useAdminUsers";


export default function SettingsAdminUser(){
    const [activeMenu, setActiveMenu] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [,navigate] = useLocation()
    const {loading,addUser} = useUsersAdmin()
    

    const [data, setData] = useState({
        full_name:'',
        document_type:'',
        document:'',
        gender:'', 
        professional_id:'',
        id_department:''
    });

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

    const onsubmit = async(event)=>{
        event.preventDefault();
        addUser(data)
        setShowModal(false)
    }

    const handleInputChange = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData);
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
                    {showModal && <Modal><AdminUser
                         onClose={handleCloseModal} 
                         onSubmit={onsubmit} 
                         handleChange={handleInputChange}
                        /></Modal>
                        
                    }
                </>
        )
    }

}