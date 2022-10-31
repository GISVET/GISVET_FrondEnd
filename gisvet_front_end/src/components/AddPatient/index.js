import React, { useEffect, useState } from "react";
import './styles.css';
import icon_Dependency_Form from "./images/Icon_Add_Dependency_Form.png"


export default function addPatient({handleChange, onSubmit, onClose}){

    const [data, setData] = useState({
        id_clinic_history:'',
        name_patient:''
    });
 
    const nonSubmit = async(event) =>{
        event.preventDefault();
        return false
    }


    return (
            <div className="form_add_user_general">
                <div className="title_image"> 
                    <img src={icon_Dependency_Form} width="40" height="40"/>
                    <h1> Registro de Pacientes</h1>
                </div>
                
                <form className="form_add_user" onSubmit={nonSubmit}>
                    <label htmlFor="id_clinic_history">Historia clínica del paciente</label>
                    <input name="id_clinic_history" onChange={handleChange}  required={true} type="number" placeholder="Inserte el nombre completo del paciente"/>
                    <label htmlFor="name_patient">Nombre del paciente</label>
                    <input name="name_patient" onChange={handleChange}  required={true} type="text" placeholder="Inserte el nombre completo del paciente"/>
 

                  
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