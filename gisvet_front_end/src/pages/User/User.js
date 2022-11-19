import React, { useEffect, useState } from "react";
import Header from "components/HeaderUser/header";
import styles from './styles.module.css';



export default function User( {children}){
    const {body, setBody} = useState()

    return (
        <div className={styles.general_admin}>
            <Header />
            {children}
        </div>
    )

}