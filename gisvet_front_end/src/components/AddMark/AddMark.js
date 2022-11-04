import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import icon_Add_Mark from "./images/Icon_Mark.png"



export default function addMark({onSubmit, onClose}){

    const [data, setData] = useState({
        name_brand:''
    });

    const doSubmit=(event)=>{
        event.preventDefault()
        onSubmit(data)
    }
 
  

    const handleChange = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData);
    }


    return (
            <div className={styles.form_add_user_general}>
                <div className={styles.title_image}> 
                    <img src={icon_Add_Mark} width="55" height="55"/>
                    <h1> Registro de Marcas</h1>
                </div>
                
                <form className={styles.form_add_user} onSubmit={doSubmit}>
                    
                    <label htmlFor="name_brand">
                            Nombre de la marca
                    </label>
                    <input name="name_brand" 
                            onChange={handleChange}  
                            required={true} 
                            type="text" 
                            placeholder="Inserte el nombre completo de la marca"/>
 

                  
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

