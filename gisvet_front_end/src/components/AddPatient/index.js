import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
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
            <div className={styles.form_add_user_general}>
                <div className={styles.title_image}> 
                    <img src={icon_Dependency_Form} width="40" height="40"/>
                    <h1> Registro de Pacientes</h1>
                </div>
                
                <form className={styles.form_add_user} onSubmit={onSubmit}>
                    <label htmlFor="id_clinic_history">
                        Historia clínica del paciente
                    </label>
                    <input name="id_clinic_history" 
                            onChange={handleChange} 
                            required={true} 
                            type="number" 
                            placeholder="Inserte el numero de historia clínica"/>
                    
                    <label htmlFor="name_patient">
                        Nombre del paciente
                    </label>
                    <input name="name_patient" 
                            onChange={handleChange}  
                            required={true} 
                            type="text" 
                            placeholder="Inserte el nombre completo del paciente"/>
 

                  
                    <div className={styles.form_horizontal}>
                        <input className={styles.button_accept} 
                                type="submit" 
                                value="Agregar"/>
                        <input className={styles.button_cancel} 
                                type="submit" 
                                onClick={onClose} 
                                value="Cancelar"/>
                    </div>
                </form>
            </div>
    )

}