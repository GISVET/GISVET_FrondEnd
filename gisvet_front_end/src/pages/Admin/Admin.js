import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import Table from "../../components/Table/Table";
import './styles.css';
import icon_Search from  "./images/Icon_Search.png"
import icon_Filter from "./images/Icon_Filter.png"
import SettingsAdminUser from "../../components/SettingsAdminUser/index";
import {useUsersAdmin} from "../../hooks/useAdminUsers";



export default function Admin( {children}){
    const {body, setBody} = useState()

    return (
        <div className="general-admin">
            <Header />
            {children}
        </div>
    )

}