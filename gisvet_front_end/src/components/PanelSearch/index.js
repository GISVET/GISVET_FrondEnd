import React, { useEffect, useState } from "react";
import './styles.css';
import icon_Search from  "./images/Icon_Search.png"
import { useRolesList } from "../../hooks/useRoles";

import { typeDoc } from "../../constants/constants";


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
            <div className="buscador">
                    <input className="buscar" onChange={handleChange} placeholder="Buscar" type="text" />
                    <input className="image_buscar" type="image" onClick={searchTerm} src={icon_Search} />
            </div>
    )
}
