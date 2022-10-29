import React, { useEffect, useState } from "react";
import './styles.css';
import Icon_pase_seguridad from "./images/Icon_pase_seg.png"
import { useRolesList } from "../../hooks/useRoles";

import { typeDoc } from "../../constants/constants";


export default function AssignDependency({onSubmit, onClose}){
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

    
    return (
            <div className="form_add_user_general">
                <div className="title_image"> 
                    <img src={Icon_pase_seguridad} width="50" height="50"/>
                    <h1> Assignacion de dependencia</h1>
                </div>
                <form className="form_add_user" onSubmit={doSubmit}>
                    <select className="document_type" onChange={handleChange}  required={true} name="document_type" >
                        <option disabled={true} selected></option>
                        { typeDocuments.map(type=>
                            <option  key={type.id} value={type.id}>
                                {type.name}
                            </option>
                            )
                        }
                    </select>

                    <select className="document_type" onChange={handleChange}  required={true} name="document_type" >
                        <option disabled={true} selected></option>
                        { typeDocuments.map(type=>
                            <option  key={type.id} value={type.id}>
                                {type.name}
                            </option>
                            )
                        }
                    </select> 
                     
                    <div className="form_horizontal">
                        <input className="button_accept" type="submit"   value="Asignar Dependencia"/>
                        <input className="button_cancel" type="submit" onClick={onClose} value="Cancelar"/>
                    </div>
                </form>
            </div>
    )
}
