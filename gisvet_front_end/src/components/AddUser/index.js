import React, { useEffect, useState } from "react";
import './styles.css';
import icon_User_Form from "./images/Icon_Add_User_Form.png"
import { useRolesList } from "../../hooks/useRoles";

import { typeDoc } from "../../constants/constants";


export default function AdminUser({handleChange, onSubmit, onClose}){
    const {loading, listRoles} = useRolesList();
    const typeDocuments = typeDoc

    const [data, setData] = useState({
        full_name:'',
        document_type:'',
        document:'',
        gender:'', 
        professional_id:'',
        id_department:''
    });
 
    const nonSubmit = async(event) =>{
        event.preventDefault();
        return false
    }
    
    return (
            <div className="form_add_user_general">
                <div className="title_image"> 
                    <img src={icon_User_Form} width="40" height="40"/>
                    <h1> Registro de Usuarios</h1>
                </div>
                <form className="form_add_user" onSubmit={nonSubmit}>
                    <label htmlFor="full_name">Nombre completo de usuario</label>
                    <input name="full_name" onChange={handleChange}  required={true} type="text" placeholder="inserte el nombre completo del usuario"/>
                    <div className="form_horizontal">
                        <div className="input-horizontal">
                            <label htmlFor="document_type">Tipo de Documento</label>
                            <select className="document_type" onChange={handleChange}  required={true} name="document_type" >
                                <option></option>
                                { typeDocuments.map(type=>
                                    <option  key={type.id} value={type.id} >
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
                            <input className="professional_id" required={false} onChange={handleChange}  type="number" name="professional_id" value="" />    
                        </div>
                        <div className="input-horizontal">
                            <label htmlFor="gender">Genero</label>
                            <select className="gender" onChange={handleChange}  required={true} name="gender">
                                <option ></option>
                               <option value='M'>Masculino</option>
                               <option value='F'>Femenino</option>
                            </select>   
                        </div>
                    </div>
                    <label htmlFor="dependency">Departamento asignado</label>
                    <select className="dependency" onChange={handleChange}  required={true} name="id_department">
                            <option></option>
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
                            <label htmlFor="password">Contraseña</label>
                            <input className="password" required={true} onChange={handleChange}  type="password" name="password" />    
                        </div>
                        <div className="input-horizontal">
                            <label htmlFor="ValidatePassword">Confirmar contraseña</label>
                            <input className="ValidatePassword" required={true} onChange={handleChange}  type="password" name="validatePassword" />    
                        </div> 
                    </div>  
                     
                    <div className="form_horizontal">
                        <input className="button_accept" type="submit" onClick={onSubmit} value="Agregar"/>
                        <input className="button_cancel" type="submit" onClick={onClose} value="Cancelar"/>
                    </div>
                </form>
            </div>
    )

}
/*
<div className="form_horizontal">
<div className="input_horizontal">
    <label htmlFor="password">Contraseña</label>
    <input name="password"  required={true} onChange={handleChange} type="text" value={data.password} placeholder="ingrese su contraseña"/>
</div>
<div className="input_horizontal">
    <label htmlFor="password">Confirmar contraseña</label>
    <input name="confirm_password" required={true} onChange={handleChange} type="text" placeholder="Repite la contraseña"/>        
</div>
</div>*/