import React, { useEffect, useState } from "react";
import './styles.css';
import icon_User_Form from "./images/Icon_Add_User_Form.png"



export default function AdminUser(onClose){

    return (
            <div className="form_add_user_general">
                <div className="title_image"> 
                    <img src={icon_User_Form} width="40" height="40"/>
                    <h1> Registro de Usuarios</h1>
                </div>
                <form className="form_add_user">
                    <label htmlFor="name">Nombre completo de usuario</label>
                    <input name="name" type="text" placeholder="inserte el nombre completo del usuarip"/>
                    <div className="form_horizontal">
                        <div className="input-horizontal">
                        <label htmlFor="type_document">Tipo de Documento</label>
                        <select className="type_document"><option>Cedula de Ciudadania</option></select>   
                        </div>
                            <div className="input-horizontal">
                            <label htmlFor="id_document">Número de Identificación</label>
                            <input type="number" name="id-document"className="id_document" placeholder="37029312"/> </div>        
                        
                    </div>
                    <label htmlFor="profesional_id">Tarjeta Profesional</label>
                    <input className="profesional_id" type="number" name="profesional_id" placeholder="928338127"/>    
                    <label htmlFor="dependency">Departamento asignado</label>
                    <select className="dependency" name="dependency" ><option>Farmacia</option><option>Consultorio</option></select>  
                    <div className="form_horizontal">
                        <div className="input_horizontal">
                        <label htmlFor="password">Contraseña</label>
                        <input name="password" type="text" placeholder="Mayuscula,minuscula,caracter especial"/>
                        </div>
                        <div className="input_horizontal">
                        <label htmlFor="password">Confirmar contraseña</label>
                        <input name="password" type="text" placeholder="Repite la contraseña"/>        
                        </div>

                    </div>
                    <div className="form_horizontal">
                        <input className="button_accept" type="submit" value="Agregar"/>
                        <input className="button_cancel" type="submit" onClick={onClose} value="Cancelar"/>
                    </div>
                </form>
            </div>
    )

}