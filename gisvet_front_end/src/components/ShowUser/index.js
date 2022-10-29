import React, { useEffect, useState } from "react";
import './styles.css';
import icon_User_settings from "./images/Icon_settings.png"
import { useRolesList } from "../../hooks/useRoles";

import { typeDoc } from "../../constants/constants";


export default function ShowUser({onSubmit, onClose}){
    const {loading, listRoles} = useRolesList();
    const [isMatchPassword, setIsMatchPassword] = useState(true)
    const [isDisable , setIsDisable] = useState(true)
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
        password:''
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

    const verifyPassword = async(event)=>{
        if(data.password == (event.target.value)){
            setIsMatchPassword(true)
            classPassword = "no-error"
        }
        else{
            setIsMatchPassword(false)
            classPassword = "error-message"
        }
    }



    
    return (
            <div className="form_add_user_general">
                <div className="title_image"> 
                    <img src={icon_User_settings} width="40" height="40"/>
                    <h1> Detalle Usuario</h1>
                </div>
                <form className="form_add_user" onSubmit={doSubmit}>
                    <label htmlFor="full_name">Nombre completo de usuario</label>
                    <input name="full_name" disabled={isDisable} onChange={handleChange}  required={true} type="text"/>
                    <div className="form_horizontal">
                        <div className="input-horizontal">
                            <label htmlFor="document_type">Tipo de Documento</label>
                            <select className="document_type" onChange={handleChange}  required={true} name="document_type" >
                                <option disabled={true} selected></option>
                                { typeDocuments.map(type=>
                                    <option  key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                    )
                                }
                            </select> 

                        </div>
                        <div className="input-horizontal">
                            <label htmlFor="document">Número de Identificación</label>
                            <input type="number" required={true} onChange={handleChange}  name="document"className="id_document"/>
                        </div> 
                    </div>
                    <div className="form_horizontal">
                        <div className="input-horizontal">
                            <label htmlFor="professional_id">Tarjeta Profesional</label>
                            <input className="professional_id" required={false} onChange={handleChange}  type="number" name="professional_id"/>    
                        </div>
                        <div className="input-horizontal">
                            <label htmlFor="gender">Genero</label>
                            <select className="gender" onChange={handleChange}  required={true} name="gender">
                                <option disabled={true} selected></option>
                               <option value='M'>Masculino</option>
                               <option value='F'>Femenino</option>
                            </select>   
                        </div>
                    </div>
                    <label htmlFor="rol">Asignar Rol</label>
                    <select className="rol" onChange={handleChange}  required={true} name="id_rol">
                    <option disabled={true} selected></option>
                            { listRoles.map(rol=>
                                    <option key={rol.ID_ROL} value={rol.ID_ROL}>
                                        {rol.NAME_ROL}
                                    </option>
                                )
                            }
                    </select>
                    <label htmlFor="email">Correo Electronico</label>
                    <input name="email" onChange={handleChange}  required={true} type="email" />

                    <div className="form_horizontal">
                        <div className="input-horizontal">
                            <label htmlFor="classPassword">Contraseña</label>
                            <input className="classPassword" required={true} onChange={handleChange}  type="password" name="password" />    
                        </div>
                        <div className="input-horizontal">
                            <label htmlFor={classPassword}>Confirmar contraseña</label>
                            <input className={classPassword} required={true} onChange={verifyPassword}  type="password" defaultValue='' name="validatePassword" />    
                        </div> 
                    </div>  
                    {!isMatchPassword &&
                        <h3 className={classPassword}>Las contraseñas no coinciden</h3>
                    }
                     
                    <div className="form_horizontal">
                        <input className="button_accept" type="submit"   value="Agregar"/>
                        <input className="button_cancel" type="submit" onClick={onClose} value="Cancelar"/>
                    </div>
                </form>
            </div>
    )
}
