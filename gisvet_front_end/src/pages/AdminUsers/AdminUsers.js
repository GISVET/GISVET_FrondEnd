import React, { useEffect } from "react";
import Header from "../../components/Header/header";
import './styles.css';
import icon_Search from  "./images/Icon_Search.png"
import icon_Filter from "./images/Icon_Filter.png"
import icon_User_Form from "./images/Icon_Add_User_Form.png"
import icon_Settings from "./images/Icon_Settings.png"
import icon_Add_User from "./images/Icon_Add_User.png"

export default function adminUser(){


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
                    <div className="table-data">
                        <table className="table-format">
                            <tbody>
                                <tr>
                                    <th>Identificación</th>
                                    <th>Nombre</th>
                                    <th>Género</th>
                                    <th>Tarjeta profesional</th>
                                    <th>Dependencia</th>
                                    <th>Rol asignado</th>
                                </tr>
                                <tr>    
                                    <td>A1</td>
                                    <td>B1</td>
                                    <td>A1</td>
                                    <td>B1</td>
                                    <td>A1</td>
                                    <td>B1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                <div className="options-admin">
                    <input type="image" src={icon_Settings} width="50" height="50"/>
                </div>
          
            <div className="options-admin-visible">
                <input className="settings-hide" type="image" src={icon_Settings} width="50" height="50"/>                
                <input className="add_user_form" type="image" src={icon_Add_User} width="50" height="50"/>
            </div>

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