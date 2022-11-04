import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import styles from './styles.module.css';
import icon_Filter from "./images/Icon_Filter.png"
import SettingsAdminUser from "../SettingsAdminUser/index";
import {useUsersAdmin} from "../../hooks/useAdminUsers";
import { Modal } from "../../components/Modal/Index"; 
import ShowUser from "../../components/ShowUser";
import PanelSearch from "../../components/PanelSearch";
import {filterPatients} from "../../constants/constants";



export default function AdminUsers(){
    const {loading, 
            users,
            listUserToTable,
            findUserByName,
            orderUsers,
            headers} = useUsersAdmin()

    const [showModal, setShowModal] = useState(false)
    const [childModal, setchildModal] = useState(<></>)
    const [orderBy,setOrderBy] = useState();

    const showUserMenu = async(identifier) =>{
        setShowModal(true)
        setchildModal(<ShowUser
            id={identifier}
            onClose={handleCloseModal} 
           />) 
    }
    const handleChange = (event)=>{
        setOrderBy(event.target.value);
    }
    

    const handleCloseModal = ()=>{
        setShowModal(false)
    }
    
    const search = function(keyword){
        findUserByName(keyword);
    }
    const ordersUsers = function(){
        orderUsers(orderBy)
    }





    return (<>
        <div className={styles.general_users}>
            <h1>Gestión de Usuarios</h1>
                <div className={styles.table_users}>
                    <div className={styles.filter_users}>
                        <PanelSearch onSubmit={search}/>
                        <div className={styles.buscador}>
                            <select placeholder="Filtrar " 
                                    type="text"
                                    onChange={handleChange}
                                    className={styles.filter_patients}>
                                        { filterPatients.map((type,index)=>{
                                            if(index==0){
                                                return(<><option key={0} disabled={true} selected>Seleccionar</option>
                                                <option  key={type.id} value={type.id}>{type.name}</option>
                                                </>);
                                            }else{
                                                return(<option  key={type.id} value={type.id}>{type.name}</option>);
                                            }})};
                            </select>
                            <input type="image" 
                                    src={icon_Filter} 
                                    className={styles.image_buscar}
                                    onClick={ordersUsers}/>
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