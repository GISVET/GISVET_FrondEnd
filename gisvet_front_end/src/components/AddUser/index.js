import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import icon_User_Form from "./images/Icon_Add_User_Form.png"
import { useRolesList } from "../../hooks/useRoles";
import { typeDoc, gender } from "../../constants/constants";


export default function AddUser({onSubmit, onClose}){
    const {loading, listRoles} = useRolesList();
    const [isMatchPassword, setIsMatchPassword] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const typeDocuments = typeDoc
    const [classPassword, setClassPassword] = useState('')

    const [data, setData] = useState({
        full_name:'',
        document_type:'',
        document:'',
        gender:'', 
        professional_id:'',
        id_rol:0,
        email:'', 
        password:''
    });

    const doSubmit = (event)=>{
        event.preventDefault();
        if(isMatchPassword){
            onSubmit(data)
        }
    }

    const handleChange = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData);
        if (name == 'password') {
            verifyPassword(event)
        }
    }

    const verifyPassword = async(event)=>{
        if(data.password == (event.target.value) && data.password.length >=8){
            setIsMatchPassword(true)
            setClassPassword('')
        }
        else{
            if (data.password.length <8) {
                setErrorMessage('La contraseña debe contener minimo 8 caracteres')
            }else{
                setErrorMessage('Las contraseñas no coinciden')
            }
            setIsMatchPassword(false)
            setClassPassword(styles.error_message_input)
        }
    }



    
    return (
            <div className={styles.form_add_user_general}>
                <div className={styles.title_image}> 
                    <img src={icon_User_Form} width="40" height="40"/>
                    <h1> Registro de Usuarios</h1>
                </div>
                <form className={styles.form_add_user}
                     onSubmit={doSubmit}>
                    <label htmlFor="full_name">
                        Nombre completo de usuario
                    </label>
                    <input name="full_name" 
                            onChange={handleChange}  
                            required={true} 
                            type="text" 
                            placeholder="inserte el nombre completo del usuario"/>

                    <div className={styles.form_horizontal}>
                        <div className={styles.input_horizontal}>
                            <label htmlFor="document_type">
                                Tipo de Documento
                            </label>
                            <select onChange={handleChange} 
                                    required={true} 
                                    name="document_type" >

                                <option disabled={true} selected></option>
                                { typeDocuments.map(type=>
                                    <option  key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                    )
                                }
                            </select> 

                        </div>
                        <div className={styles.input_horizontal}>
                            <label htmlFor="document">
                                Número de Identificación
                            </label>
                            <input type="number"
                                    required={true} 
                                    onChange={handleChange}  
                                    name="document"/>
                        </div> 
                    </div>
                    <div className={styles.form_horizontal}>
                        <div className={styles.input_horizontal}>
                            <label htmlFor="professional_id">
                                Tarjeta Profesional
                            </label>
                            <input required={false} 
                                    onChange={handleChange}  
                                    type="number" 
                                    name="professional_id"/>    
                        </div>
                        <div className={styles.input_horizontal}>
                            <label htmlFor="gender">
                                Genero
                            </label>
                            <select onChange={handleChange}  
                                    required={true} 
                                    name="gender">

                                <option disabled={true} selected></option>
                                    { gender.map(gdr=>
                                            <option key={gdr.id} value={gdr.id}>
                                                {gdr.name}
                                            </option>
                                        )
                                    } 
                            </select>
                        </div>
                    </div>
                    <label htmlFor="id_rol">Asignar Rol</label>
                    <select onChange={handleChange}  
                            required={true} 
                            name="id_rol">

                    <option disabled={true} selected></option>
                            { listRoles.map(rol=>
                                    <option key={rol.ID_ROL} value={rol.ID_ROL}>
                                        {rol.NAME_ROL}
                                    </option>
                                )
                            }
                    </select>
                    <label htmlFor="email">
                        Correo Electronico
                    </label>
                    <input name="email" 
                            onChange={handleChange}  
                            required={true} 
                            type="email" />

                    <div className={styles.form_horizontal}>
                        <div className={styles.input_horizontal}>
                            <label htmlFor="password">
                                Contraseña
                            </label>
                            <input required={true} 
                                    className={classPassword}
                                    onChange={handleChange}  
                                    type="password" 
                                    name="password" />    
                        </div>
                        <div className={styles.input_horizontal}>
                            <label htmlFor="validatePassword">
                                Confirmar contraseña
                            </label>
                            <input required={true}
                                    className={classPassword} 
                                    onChange={verifyPassword}  
                                    type="password" 
                                    defaultValue='' 
                                    name="validatePassword" />    
                        </div> 
                    </div>  
                    {!isMatchPassword &&
                        <h3 className={styles.error_message}>{errorMessage}</h3>
                    }
                     
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
