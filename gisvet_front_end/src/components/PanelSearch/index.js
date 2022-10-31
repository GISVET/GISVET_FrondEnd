import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import icon_Search from  "./images/Icon_Search.png"


export default function PanelSearch({onSubmit}){
    const [keyword, setkeyword] = useState('')
 

    const searchTerm = (event)=>{
        event.preventDefault();
        onSubmit(keyword)
    }

    const handleChange = (event)=>{
        setkeyword(event.target.value);
    }

    
    return (
            <div className={styles.buscador}>
                    <input className={styles.buscar} 
                            onChange={handleChange} 
                            placeholder="Buscar" 
                            type="text" />
                            
                    <input className={styles.image_buscar} 
                            type="image" onClick={searchTerm} 
                            src={icon_Search} />
            </div>
    )
}
