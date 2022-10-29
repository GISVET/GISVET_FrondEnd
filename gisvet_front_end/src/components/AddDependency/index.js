import React, { useEffect, useState } from "react";
import './styles.css';
import icon_Dependency_Form from "./images/Icon_Add_Dependency_Form.png"
import { useRolesList } from "../../hooks/useRoles";
import { typeDoc } from "../../constants/constants";


export default function addDependency({handleChange, onSubmit, onClose}){
    const {loading, listRoles} = useRolesList();
    const typeDocuments = typeDoc

    const [data, setData] = useState({
        id:'',
        name:'',
        role:''
    });
 
    const nonSubmit = async(event) =>{
        event.preventDefault();
        return false
    }
    
    return (
            <div className="form_add_user_general">
                <div className="title_image"> 
                    <img src={icon_Dependency_Form} width="40" height="40"/>
                    <h1> Registro de Dependencias</h1>
                </div>
                <form className="form_add_user" onSubmit={nonSubmit}>
                    <label htmlFor="full_name">Nombre del departamento</label>
                    <input name="full_name" onChange={handleChange}  required={true} type="text" placeholder="Inserte el nombre completo del usuario"/>
 
                    <select className="dependency" onChange={handleChange}  required={true} name="id_department">
                            <option></option>
                            { listRoles.map(rol=>
                                    <option key={rol.ID_ROL} value={rol.ID_ROL}>
                                        {rol.NAME_ROL}
                                    </option>
                                )
                            }
                    </select>

                  
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