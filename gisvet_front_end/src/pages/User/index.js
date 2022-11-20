import React, { useEffect, useState } from "react";
import Header from "components/HeaderUser/header";
import styles from './styles.module.css';
import useUser from "hooks/useUser";
import {useLocation } from "wouter"



export default function User( {params, children}){
    const [body, setBody] = useState()
    const [isAuthorized, setIsAuthorized] = useState(false)
    const {islogged,role, dependencieActive} = useUser()
    const [,navigate] = useLocation()
    console.log("esto es un punto ")

    useEffect(()=>{
        console.log(role)
        if(islogged && role === 'Usuario'){
            selectDepartament()
        }else{
            setIsAuthorized(false)
        }

    },[islogged, role, dependencieActive])

    const selectDepartament= ()=>{
        console.log(dependencieActive)
        if (Object.entries(dependencieActive).length !== 0 && dependencieActive !== null) {
            console.log(`sta es la dependencia ${dependencieActive.DEPENDECIE_TYPE}`)
            switch (dependencieActive.DEPENDECIE_TYPE) {
                case 'B':
                    setIsAuthorized(true)
                    setBody(bodyGrocery)
                    break;
                case 'F':
                    setIsAuthorized(true)
                    setBody(bodyPharmacy)
                    break;
                case 'C':
                    setIsAuthorized(true)
                    setBody(bodySurgery)
                    break;
                default:
                    navigate("/unauthorized")
                    break;
            }
        }
    }

    const bodyGrocery= <div className={styles.general_admin}>
                    <Header />
                    {children}
                </div>


    const bodyPharmacy=<div className={styles.general_admin}>
                            <Header />
                            {children}
                        </div>

    const bodySurgery=<div className={styles.general_admin}>
                        <Header />
                        {children}
                    </div>

    return (<>
     {isAuthorized &&
       body}
      <p>Esto es una prueba</p>
    </>

    )

}