import React,{useState, useEffect} from "react";
import Header from "components/HeaderAdmin/header";
import styles from './styles.module.css';
import useUser from "hooks/useUser";


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
