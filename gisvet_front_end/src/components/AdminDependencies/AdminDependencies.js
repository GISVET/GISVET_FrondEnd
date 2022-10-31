import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import styles from './styles.module.css';
import icon_Filter from "./images/Icon_Filter.png"
import {useAdminDependencies} from "../../hooks/useAdminDependencies";
import SettingsAdminDepedencies from "../SettingsAdminDependencies";
import {filterDependencies, filterDependenciesName} from "../../constants/constants";
import {typeDependencies} from "../../constants/constants";
import PanelSearch from "../../components/PanelSearch";




export default function AdminDependencies(){

    const [typeFilter,setTypeFilter] = useState([]);
    const [typeFilterId,setTypeFilterId] = useState(0);
    const [askFilter,setAskFilter] = useState();
    const {loading, dependencies,headers,orderDependency,askDependencyName,askDependencyType} = useAdminDependencies()

    useEffect(()=>{
        if(typeFilterId=="1"){
            setTypeFilter(filterDependenciesName);
        }else if (typeFilterId=="2"){
            setTypeFilter(typeDependencies);
        }

    },[typeFilterId])

    const showUserMenu = async(identifier) =>{
    }

    const askDependency=(keyword)=>{
        askDependencyName(keyword);
    }

    const handleTypeFilter = (event)=>{
        setTypeFilterId(event.target.value);
    }
    

    const filterDependenciesFunction=()=>{
        console.log(`El filtro que llega es ${typeFilterId.id} con ${askFilter.name}`)
        if (typeFilter.name=="1"){
            orderDependency(askFilter.name);

        }else if (typeFilter.name=="2"){
            askDependencyType(askFilter.name);

        }
    }

    const handleAskFilter = (event)=>{
        console.log(event.target.value);
        setAskFilter(event.target.value);
        
    }

    console.log("Entra en el admin dependencies")
    return (
        <div className={styles.general_users}>
            <h1>Gestión de Dependencias</h1>
                <div className={styles.table_users}>
                <div className={styles.filter_users}>
                        
                        <PanelSearch onSubmit={askDependency}/>
                        <div className={styles.buscador}>
                        <select placeholder="Filtrar" 
                                onChange={handleTypeFilter} 
                                className={styles.filter_dependencies} 
                                type="text" >

                                <option disabled={true} selected></option>
                                { filterDependencies.map(type=>
                                    <option  key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                    )
                                }
                        </select> 
                        <select selected
                                 placeholder="Filtrar" 
                                 onChange={handleAskFilter} 
                                 className={styles.filter_dependencies_option} 
                                 type="text" >
                              
                                {typeFilter.map((type,index)=><>
                                    {(index===0)&&
                                        <option disabled={true} selected >{index}</option>
                                    }
                                    <option  key={type.id} value={type.id}>
                                    {type.name}
                                    </option>
                                    </>)
                                }
                                
                        </select> 
                            <input type="image"
                                     src={icon_Filter} 
                                     onClick={filterDependenciesFunction} 
                                     className={styles.image_buscar}/>
                        </div>
                    </div>

                <Table headers={headers} data={dependencies}
                        keyName={'id_dependencie'}
                        actionItem={showUserMenu}/>  
                <SettingsAdminDepedencies/> 
            </div>
        </div>
    )

}