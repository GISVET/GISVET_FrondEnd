import React, { useEffect } from "react";
import Header from "../../components/Header/header";
import './styles.css';

export default function adminUser(){


    return (
        <div class="general-admin">
            <Header />
            <div class="general-users">
            <h1>Gestión de Usuarios</h1>
                <div class="table-users">
                    <div class="filter-users">
                        <div class="buscador">
                                <input type="image" src="./images/Icon_Search.png" class="image_buscar"/>
                                <input placeholder="Buscar" type="text" class="buscar"/>
                        </div>
                        <div class="buscador">
                            <input placeholder="Filtrar" type="text" class="buscar"/>
                            <input type="image" src="./images/Icon_Filter.png" class="image_buscar"/>
                        </div>
                    </div>
                    <div class="table-data">
                        <table class="table-format">
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
                <div class="options-admin">
                    <input type="image" src="./images/Icon_Settings.png" width="50" height="50"/>
                </div>
          
            <div class="options-admin-visible">
                <input class="settings-hide" type="image" src="./images/Icon_Settings.png" width="50" height="50"/>                
                <input class="add_user_form" type="image" src="./images/Icon_Add_User.png" width="50" height="50"/>
            </div>

            <div class="form_add_user_general">
              <div class="title_image"> 
                <img src="./images/Icon_Add_User_Form.png" width="40" height="40"/>
                 <h1> Registro de Usuarios</h1>
              </div>
          </div>
            
            </div>
          

        </div>
    </div>
    )

}