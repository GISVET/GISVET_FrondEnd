//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de hooks ====
import { useAdminDependencies } from "../../../../hooks/AdminHooks/DependenciesHooks/useAdminDependencies";
import { useUsersAdmin } from "../../../../hooks/AdminHooks/UsersHooks/useAdminUsers";

//=====Importaciones de imagenes ====
import Icon_pase_seguridad from "./images/Icon_pase_seg.png";



export default function AssignDependency({onSubmit, onClose}){

    const {loading, 
        users,
        findUserByName,} = useUsersAdmin()
    const {
        dependencies,
        isUpdateDependencies,
      } = useAdminDependencies();
    
    const [isReadyData, setIsReadyData] = useState(false)

    useEffect(()=>{
        isUpdateDependencies()
        console.log('Entramos en el efecto del assign')
        if(dependencies != undefined && users != undefined){
            setIsReadyData(true)
        }
    },[])

    const [data, setData] = useState({
        id_dependencie:'',
        id_person:''
    });
 

    const doSubmit = (event)=>{
        event.preventDefault();
        console.log(data)
        onSubmit(data)
    }

    const handleChange = (event)=>{
        let {name, value} = event.target;
        let newData = {...data, [name]: value}
        setData(newData);
    }

    
    return (
            <div className={styles.form_add_user_general}>
             {isReadyData && <>
                <div className={styles.title_image}> 
                    <img src={Icon_pase_seguridad} width="50" height="50"/>
                    <h1> Assignacion de dependencia</h1>
                </div>
           
                <form className={styles.form_add_user} 
                        onSubmit={doSubmit}>

                    <label htmlFor="id_person">
                       Seleccione el usuario
                    </label>

                    <select className={styles.document_type} 
                            onChange={handleChange}  
                            required={true} 
                            name="id_person" >

                        <option disabled={true} selected></option>
                        { users.map(user=>
                            <option  key={user.ID_PERSON} value={user.ID_PERSON}>
                                {user.DOCUMENT+' '+user.FULL_NAME}
                            </option>
                            )
                        }
                    </select>

                    <label htmlFor="id_dependencie">
                       Seleccione dependencia a asignar
                    </label>

                    <select className={styles.document_type} 
                            onChange={handleChange}  
                            required={true} 
                            name="id_dependencie" >

                        <option disabled={true} selected></option>
                        { dependencies.map(dep=>
                            <option  key={dep.id_dependencie} value={dep.id_dependencie}>
                                {dep.dependencie_name}
                            </option>
                            )
                        }
                    </select> 
                    
                    <div className={styles.form_horizontal}>
                        <input className={styles.button_accept} 
                                type="submit"   
                                value="Asignar Dependencia"/>

                        <input className={styles.button_cancel} 
                                type="submit" 
                                onClick={onClose} 
                                value="Cancelar"/>
                    </div>
                </form>
            </>}
        </div>
    )
}
