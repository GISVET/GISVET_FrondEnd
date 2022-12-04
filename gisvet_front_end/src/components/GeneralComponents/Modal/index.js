import React, { Component } from "react";
import ReactDOM  from "react-dom";
import styles from "./style.module.css"



function Modalcontent({children, onClose}) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                {children}
            </div>
        </div>
    )
}

export function Modal({children, onClose}){
    return ReactDOM.createPortal(
        <Modalcontent onClose={onClose}>
            {children}
        </Modalcontent>,
        document.getElementById('modal-root')
    )
}