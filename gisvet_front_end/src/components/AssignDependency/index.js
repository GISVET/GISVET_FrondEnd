import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import Icon_pase_seguridad from "./images/Icon_pase_seg.png"
import { useRolesList } from "../../hooks/useRoles";
import { typeDoc } from "../../constants/constants";
import { useAdminDependencies } from "../../hooks/useAdminDependencies";
import {useUsersAdmin} from "../../hooks/useAdminUsers";


export default function AssignDependency({onSearch,onSubmit, onClose}){

    const {loading, 
        users,
        findUserByName,} = useUsersAdmin()
    const {
        dependencies,
        isUpdateDependencies,
      } = useAdminDependencies();
    
    const [isReadyData, setIsReadyData] = useState(false)
    const [isMatchPassword, setIsMatchPassword] = useState(true)
    const typeDocuments = typeDoc
    let classPassword = "no-error"

    useEffect(()=>{
        isUpdateDependencies()
        if(dependencies != undefined && users != undefined){
            console.log(dependencies)
            setIsReadyData(true)
        }
    },[])



    const [data, setData] = useState({
        full_name:'',
        document_type:'',
        document:'',
        gender:'', 
        professional_id:'',
        id_rol:0,
        email:'', 
        password:'',
        id_department:0
    });
 

    const doSubmit = (event)=>{
        event.preventDefault();
        if(isMatchPassword){
            onSubmit(data)
        }
    }

    const handleChange = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData);
    }
    const search = function(Keyword){
        console.log(Keyword+' a buscar')
    }

    
    return (
            <div className={styles.form_add_user_general}>
             {isReadyData && <>
                <div className={styles.title_image}> 
                    <img src={Icon_pase_seguridad} width="50" height="50"/>
                    <h1> Assignacion de dependencia</h1>
                </div>
           
                <form className={styles.form_add_user} 
                        onSubmit={doSubmit}>

                    <label htmlFor="id_user">
                       Seleccione el usuario
                    </label>

                    <select className={styles.document_type} 
                            onChange={handleChange}  
                            required={true} 
                            name="id_user" >

                        <option disabled={true} selected></option>
                        { users.map(dep=>
                            <option  key={dep.id_dependencie} value={dep.id_dependencie}>
                                {dep.dependencie_name}
                            </option>
                            )
                        }
                    </select>

                    <label htmlFor="id_dependencie">
                       Seleccione el usuario
                    </label>

                    <select className={styles.document_type} 
                            onChange={handleChange}  
                            required={true} 
                            name="id_dependencie" >

                        <option disabled={true} selected></option>
                        { dependencies.map(dep=>
                            <option  key={dep.id_dependencie} value={dep.id_dependencie}>
                                {dep.dependencie_name}
                            </option>
                            )
                        }
                    </select> 
                    
                    <div className={styles.form_horizontal}>
                        <input className={styles.button_accept} 
                                type="submit"   
                                value="Asignar Dependencia"/>

                        <input className={styles.button_cancel} 
                                type="submit" 
                                onClick={onClose} 
                                value="Cancelar"/>
                    </div>
                </form>
            </>}
        </div>
    )
}
