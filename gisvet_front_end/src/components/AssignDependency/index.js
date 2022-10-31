import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import Icon_pase_seguridad from "./images/Icon_pase_seg.png"
import { useRolesList } from "../../hooks/useRoles";
import PanelSearch from "../../components/PanelSearch";
import { typeDoc } from "../../constants/constants";


export default function AssignDependency({onSearch,onSubmit, onClose}){
    const {loading, listRoles} = useRolesList();
    const [isMatchPassword, setIsMatchPassword] = useState(true)
    let OthersRoles = Object.assign([], listRoles);
    const typeDocuments = typeDoc
    let classPassword = "no-error"

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
                <div className={styles.title_image}> 
                    <img src={Icon_pase_seguridad} width="50" height="50"/>
                    <h1> Assignacion de dependencia</h1>
                </div>
                <PanelSearch onSubmit={search}/>
                <form className={styles.form_add_user} 
                        onSubmit={doSubmit}>

                    <select className={styles.document_type} 
                            onChange={handleChange}  
                            required={true} 
                            name="document_type" >

                        <option disabled={true} selected></option>
                        { typeDocuments.map(type=>
                            <option  key={type.id} value={type.id}>
                                {type.name}
                            </option>
                            )
                        }
                    </select>

                    <select className={styles.document_type} 
                            onChange={handleChange}  
                            required={true} 
                            name="document_type" >

                        <option disabled={true} selected></option>
                        { typeDocuments.map(type=>
                            <option  key={type.id} value={type.id}>
                                {type.name}
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
            </div>
    )
}
