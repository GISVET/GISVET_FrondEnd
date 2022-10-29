import React, { Component } from "react";
import ReactDOM  from "react-dom";
import "./style.css"



function Modalcontent({children, onClose}) {
    return (
        <div className="modal">
            <div className="modal-content">
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