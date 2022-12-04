//=====Importaciones de React ====
import React,{useState, useEffect} from "react";

//=====Importaciones de componentes ====
import Header from "components/AdminComponents/HeaderAdmin/header";

//=====Importaciones de estilos ====
import styles from './styles.module.css';

//=====Importaciones de hooks ====
import useUser from "hooks/UserHooks/useUser";


export default function Admin( {children}){
    const [isAuthorized, setIsAuthorized] = useState(false)
    const {islogged,role} = useUser()

    useEffect(()=>{
        if(islogged && role === 'Administrador'){
            setIsAuthorized(true)
        }else{
            setIsAuthorized(false)
        }


    },[islogged, role])


    return (isAuthorized? 
        <div className={styles.general_admin}>
            <Header />
            {children}
        </div>
        :
        <>
            <h3>Ubicación no disponible</h3>
        </>
    )

}
