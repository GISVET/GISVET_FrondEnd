import React from "react";
import ReactDOM  from "react-dom";
import styles from "./style.module.css"
import { Button } from 'primereact/button';



function Modalcontent({children, onClose}) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.headerModal}>
                    <Button icon="pi pi-times" 
                            className="p-button-rounded p-button-danger p-button-text" 
                            onClick={onClose}
                            aria-label="Cancel" 
                    />
                </div>
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