import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import Table from "../../components/Table/Table";
import './styles.css';
import icon_Search from  "./images/Icon_Search.png"
import icon_Filter from "./images/Icon_Filter.png"
import icon_User_Form from "./images/Icon_Add_User_Form.png"
import SettingsAdminUser from "../../components/SettingsAdminUser/index";
import { usersAdmin } from "../../constants/headersTables";
import {useUsersList} from "../../hooks/useAdmin";





const data=[
    {
        "DOCUMENT_TYPE": "C",
        "FULL_NAME": "Yilma Estefanía Sora Albornoz",
        "DOCUMENT": 11111,
        "GENDER": "F",
        "PROFESSIONAL_ID": 321312,
        "ID_DEPARTMENT": 1,
        "ID": 1
    }, {
        "DOCUMENT_TYPE": "C",
        "FULL_NAME": "Dayana Carolina Vargas Alba",
        "DOCUMENT": 11111,
        "GENDER": "F",
        "PROFESSIONAL_ID": 321312,
        "ID_DEPARTMENT": 1,
        "ID": 1
    },{
        "DOCUMENT_TYPE": "C",
        "FULL_NAME": "Emerson Uriel Vargas Alba",
        "DOCUMENT": 11111,
        "GENDER": "F",
        "PROFESSIONAL_ID": 321312,
        "ID_DEPARTMENT": 1,
        "ID": 1
    }, {
        "DOCUMENT_TYPE": "C",
        "FULL_NAME": "Juan Esteban Iguavita Monroy",
        "DOCUMENT": 11111,
        "GENDER": "F",
        "PROFESSIONAL_ID": 321312,
        "ID_DEPARTMENT": 1,
        "ID": 1
    }
]

export default function adminUser(){

    const [headers, setHeaders] = useState(usersAdmin)
    const [datas, setData] = useState(useUsersList().userList)

    return (
        <div className="general-admin">
            <Header />
            <div className="general-users">
            <h1>Gestión de Usuarios</h1>
                <div className="table-users">
                    <div className="filter-users">
                        <div className="buscador">
                                <input type="image" src={icon_Search} className="image_buscar"/>
                                <input placeholder="Buscar" type="text" className="buscar"/>
                        </div>
                        <div className="buscador">
                            <input placeholder="Filtrar" type="text" className="buscar"/>
                            <input type="image" src={icon_Filter} className="image_buscar"/>
                        </div>
                    </div>

                <Table header={headers} data={datas}/>  
                <SettingsAdminUser /> 

            <div className="form_add_user_general">
              <div className="title_image"> 
                <img src={icon_User_Form} width="40" height="40"/>
                 <h1> Registro de Usuarios</h1>
              </div>
          </div>
            
            </div>
          

        </div>
    </div>
    )

}