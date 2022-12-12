//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from './styles.module.css';

//=====Importaciones de imagenes ====
import icon_catPostman from "./images/catPostman.png"

import useUser from "hooks/UserHooks/useUser";

export default function ConfirmGenerateToken({onSubmit, onClose}){

    const {email} = useUser()

    const doSubmit=(event)=>{
        event.preventDefault()
        onSubmit()
    }
 

    return (
            <div className={styles.form_add_user_general}>
                <div className={styles.title_image}> 
                    <h1> Generación de Token Temporal</h1>
                </div>
                
                <form className={styles.form_add_user} onSubmit={doSubmit}>
                    
                    <div className="grid">
                        <div className="col-3">
                        <img src={icon_catPostman} alt="Mail" width="100" />
                        </div>
                        <div className={styles.content_text + ' col-8'}>
                            <p>Se enviará al correo electrónico {email} un token temporal
                                con el que podrá validar sus credenciales con las operaciones
                                con las otras dependencias</p>
                        </div>
                    </div>
                  
                    <div className={styles.form_horizontal}>
                        <input className={styles.button_accept} 
                                type="submit" 
                                value="Aceptar"/>
                        <input className={styles.button_cancel} 
                                type="submit" 
                                onClick={onClose} 
                                value="Cancelar"/>
                    </div>
                </form>
            </div>
    )

}

