import React, { useEffect, useState } from "react";
import './styles.css';
import icon_Settings from "./images/Icon_Settings.png"
import icon_Add_Patient from "./images/Icon_Add_Patient.png"
import { Modal } from "../Modal/Index"; 
import AddPatient from "../AddPatient";
import {useLocation } from "wouter"
import {useAdminPatients} from "../../hooks/useAdminPatients";


export default function SettingsAdminDepedencies(){
    const [activeMenu, setActiveMenu] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [,navigate] = useLocation()
    const {loading,addPatient} = useAdminPatients()
    

    const [data, setData] = useState({
        id_clinic_history:'',
        name_patient:'',
    });

    const setVisibleMenu = async(event) =>{
        event.preventDefault();
        activeMenu?setActiveMenu(false):setActiveMenu(true)
    }

    const showAddPatientsMenu = async(event) =>{
        event.preventDefault();
        return setShowModal(true)
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
    }

    const onsubmit = async(event)=>{
        event.preventDefault();
        addPatient(data)
        setShowModal(false)
    }

    const handleInputChange = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData);
    }

    if (!activeMenu) {
        return (<div className="options-admin" >
                    <input type="image"  onClick={setVisibleMenu} src={icon_Settings} width="45" height="45"/>
                </div>
        )
    }else{
        return (<>
                    <div className="options-admin-visible" >
                        <input className="settings-hide" type="image" onClick={setVisibleMenu} src={icon_Settings} width="45" height="45"/>
                        <input className="add_user_form" type="image" onClick={showAddPatientsMenu} src={icon_Add_Patient} width="40" height="40"/>
                    </div>
                    {showModal && <Modal><AddPatient
                         onClose={handleCloseModal} 
                         onSubmit={onsubmit} 
                         handleChange={handleInputChange}
                        /></Modal>
                        
                    }
                </>
        )
    }

}