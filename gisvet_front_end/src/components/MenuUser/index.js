import React, { useEffect, useState } from "react";
import './styles.css';
import icon_User_Form from "./images/Icon_Add_User_Form.png"



export default function MenuUser(){



    return (
            <div className="form_add_user_general">
              <div className="title_image"> 
                <img src={icon_User_Form} width="40" height="40"/>
                 <h1> Registro de Usuarios</h1>
              </div>
            </div>
    )

}