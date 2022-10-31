import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import './styles.css';
import icon_Search from  "./images/Icon_Search.png"
import icon_Filter from "./images/Icon_Filter.png"
import {useAdminPatients} from "../../hooks/useAdminPatients";
import SettingsAdminPatients from "../SettingsAdminPatients";
import {filterPatients} from "../../constants/constants";


import { Modal } from "../../components/Modal/Index"; 





export default function AdminPatients(){
    const {loading, patients,headers,orderPatient,askPatientName} = useAdminPatients()
    const [showModal, setShowModal] = useState(false)
    const [childModal, setchildModal] = useState(<></>)
    const [orderBy,setOrderBy] = useState();
    const [askName,setAskName] = useState();

    

    const showUserMenu = async(identifier) =>{
    }

    const handleChange = (event)=>{
        setOrderBy(event.target.value);
    }
    const handleName = (event)=>{
        setAskName(event.target.value);
    }

    const orderPatients=()=>{
        orderPatient(orderBy);
    }

    const askPatients=()=>{
        askPatientName(askName);
    }

    return (
        <>
        <div className="general-users">
            <h1>Gestión de Pacientes</h1>
                <div className="table-users">
                <div className="filter-users">
                        <div className="buscador">
                                <input className="buscar" onChange={handleName} placeholder="Buscar" type="text" />
                                <input className="image_buscar" onClick={askPatients} type="image" src={icon_Search} />
                        </div>
                        <div className="buscador">
                        <select placeholder="Filtrar" onChange={handleChange} className="filter_patients" type="text" >
                                <option disabled={true} selected></option>
                                { filterPatients.map(type=>
                                    <option  key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                    )
                                }
                            </select> 
                        
                            <input type="image" onClick={orderPatients} src={icon_Filter} className="image_buscar"/>
                        </div>
                    </div>

                <Table  headers={headers} 
                        data={patients}
                        keyName={'id_clinic_history'}
                        actionItem={showUserMenu}
                />  
                <SettingsAdminPatients/> 

            </div>
            
        </div>

                {showModal && <Modal>{childModal}</Modal>
                        
                    }
                    </>
    )
    

}