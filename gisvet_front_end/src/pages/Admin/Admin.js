import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderAdmin/header";
import './styles.css';



export default function Admin( {children}){
    const {body, setBody} = useState()

    return (
        <div className={styles.general-admin}>
            <Header />
            {children}
        </div>
    )

}