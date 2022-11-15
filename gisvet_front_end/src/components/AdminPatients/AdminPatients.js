import React, { useEffect, useState } from "react";
import Table from "components/Table/Table";
import styles from './styles.module.css';
import PanelSearch from "components/PanelSearch";
import icon_Filter from "./images/Icon_Filter.png"
import {useAdminPatients} from "hooks/useAdminPatients";
import SettingsAdminPatients from "components/SettingsAdminPatients";
import {filterPatients} from "constants/constants";
import { Modal } from "components/Modal/Index"; 

export default function AdminPatients(){
    const {loading, patients,headers,orderPatient,askPatientName} = useAdminPatients()
    const [showModal, setShowModal] = useState(false)
    const [childModal, setchildModal] = useState(<></>)
    const [orderBy,setOrderBy] = useState();
    const showUserMenu = async(identifier) =>{
    }
    const handleChange = (event)=>{
        setOrderBy(event.target.value);
    }
    const orderPatients=()=>{
        orderPatient(orderBy);
    }
    const askPatients=(Keyword)=>{
        askPatientName(Keyword);
    }
    return (
        <>
        <div className={styles.general_users}>
            <h1>Gestión de Pacientes</h1>
                <div className={styles.table_users}>
                <div className={styles.filter_users}>
                        <PanelSearch onSubmit={askPatients}/>
                        <div className={styles.buscador}>
                            <select placeholder="Filtrar " 
                                    type="text"
                                    onChange={handleChange}
                                    className={styles.filter_patients}>
                                        { filterPatients.map((type,index)=>{
                                            if(index==0){
                                                return(<><option key={0} disabled={true} defaultValue>Seleccionar</option>
                                                <option  key={type.id} value={type.id}>{type.name}</option>
                                                </>);
                                            }else{
                                                return(<option  key={type.id} value={type.id}>{type.name}</option>);
                                            }})};
                            </select>
                            <input type="image" 
                                    src={icon_Filter} 
                                    className={styles.image_buscar}
                                    onClick={orderPatients}/>
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
         {
            showModal && <Modal>{childModal}</Modal>
        }
        </>
    )
    

}