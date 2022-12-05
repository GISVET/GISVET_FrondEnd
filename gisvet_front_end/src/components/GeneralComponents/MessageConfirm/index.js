import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import icon_information from "./images/icon_information.png"


export default function MessageConfirm({isCorrect,message,onClose}){
    const [classText, setClassText] = useState()
    const [classButton, setClassButton] = useState()
    

    useEffect(()=>{
        if(!isCorrect){
            setClassText(styles.errorMessage)
            setClassButton(styles.button_accept_error)
        }else{
            setClassText(styles.okMessage)
            setClassButton(styles.button_accept_ok)
        }
    },[isCorrect])

    
    return (
            <div className={styles.content_informtion_message}>
             {onClose!= undefined && <>
                <div className={styles.title_image}> 
                    <img src={icon_information} width="30" height="30"/>
                    <h1 className={classText}>{message}</h1>
                </div>

                <input className={classButton} 
                                type="submit" 
                                onClick={onClose} 
                                value="Aceptar"/>
           
            </>}
        </div>
    )
}
