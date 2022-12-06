import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import catLoading from "images/RunningCat1.gif"
 

export default function Loading({text, sizeIn}) {
    const [label, setLabel] = useState('Cargando...')
    const [size, setSize] = useState(100)

    useEffect(()=>{
        if (text !== undefined) {
            setLabel(text)
        }
        if (sizeIn !== undefined) {
            setSize(sizeIn)
        }
    },[text,sizeIn])

    return (<div className={styles.contentLoading}>
                <img src={catLoading} alt="loadingCat" height={size} />
                <h1>{label}</h1>
            </div>
    )
        
}