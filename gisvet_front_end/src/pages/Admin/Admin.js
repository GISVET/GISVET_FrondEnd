import React, { useEffect, useState } from "react";
import Header from "components/HeaderAdmin/header";
import styles from './styles.module.css';



export default function Admin( {children}){
    const {body, setBody} = useState()

    return (
        <div className={styles.general_admin}>
            <Header />
            {children}
        </div>
    )

}