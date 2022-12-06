import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import icon_Dependency_Form from "./images/Icon_Add_Dependency_Form.png"
import { typeDependencies } from "constants/constants";


export default function AddDependency({onSubmit, onClose}) {
    const [data, setData] = useState({
        dependencie_name: "",
        type_dependencie: "",
      });

    const doSubmit = (event)=>{
        event.preventDefault();
        onSubmit(data);
    }
 
    const nonSubmit = async(event) =>{
        event.preventDefault();
        return false
    }

    const handleTypeDependencie = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData);
    }
    return (
            <div className={styles.form_add_user_general}>
                <div className={styles.title_image}> 
                    <img src={icon_Dependency_Form} width="40" height="40"/>
                    <h1> Registro de Dependencias</h1>
                </div>
                <form className={styles.form_add_user} onSubmit={nonSubmit}>
                    <label htmlFor="full_name">
                        Nombre del departamento
                    </label>
                    <input name="dependencie_name" 
                            onChange={handleTypeDependencie}  
                            required={true}
                            type="text" 
                            placeholder="Inserte el nombre de la dependencia a agregar"/>
 
                    <select className={styles.typeDependencieSelect} onChange={handleTypeDependencie}  
                                required={true} 
                                name="type_dependencie">

                            <option disabled={true} selected></option>
                            { typeDependencies.map(typeDependency=>
                                    <option key={typeDependency.id} value={typeDependency.id}>
                                        {typeDependency.name}
                                    </option>
                                )
                            }
                    </select>
                    <div className={styles.form_horizontal}>
                        <input className={styles.button_accept} type="submit" onClick={doSubmit} value="Agregar"/>
                        <input className={styles.button_cancel} type="submit" onClick={onClose} value="Cancelar"/>
                    </div>
                </form>
            </div>
    )

}