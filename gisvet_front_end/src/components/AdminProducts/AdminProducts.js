import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import styles from './styles.module.css';
import PanelSearch from "../../components/PanelSearch";
import icon_Filter from "./images/Icon_Filter.png"
import SettingsAdminUser from "../SettingsAdminUser/index";
import {useDependenciesAdmin} from "../../hooks/useAdminDependencies";



export default function AdminDependencies(){
    const {loading, dependencies,headers} = useDependenciesAdmin()

    const search = function(Keyword){
        console.log(Keyword+' a buscar')
    }

    return (
        <div className={styles.general_users}>
            <h1>Gestión de Dependencias</h1>
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

                <Table headers={headers} data={dependencies}/>  
                <SettingsAdminUser /> 
            </div>
        </div>
    )

}