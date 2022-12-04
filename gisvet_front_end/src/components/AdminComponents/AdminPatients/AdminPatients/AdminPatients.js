//=====Importaciones de React====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos====
import styles from "./styles.module.css";

//=====Importaciones de imagenes====
import icon_Filter from "./images/Icon_Filter.png";

//=====Importaciones de componentes PrimeReact====
import { Modal } from "components/GeneralComponents/Modal";

//=====Importaciones de componentes generales====
import Table from "components/AdminComponents/AdminPatients/TablePatients/TablePatients";
import SettingsAdminPatients from "components/AdminComponents/AdminPatients/SettingsAdminPatients";
import ShowPatient from "components/AdminComponents/AdminPatients/ShowPatient/ShowPatient";

//=====Importaciones de hooks ====
import { useAdminPatients } from "../../../../hooks/AdminHooks/PatientsHooks/useAdminPatients";

//=====Importaciones de constantes ====
import { filterPatients } from "constants/constants";


export default function AdminPatients() {
    const { patients, headers } =
    useAdminPatients();
    const [showModal, setShowModal] = useState(false);
    const [childModal, setchildModal] = useState( < > < />);



            const showPatientMenu = async(data) => {
                console.log(`El id en el showPatient es ${data}`);
                setShowModal(true);
                setchildModal( <
                    ShowPatient dataPatient = { data }
                    onClose = { handleCloseModal }
                    onSubmit = { onSubmitDependency }
                    />
                );
            };

            const onSubmitDependency = () => {};

            const handleCloseModal = () => {
                setShowModal(false);
            };


            return ( <
                >
                <
                div className = { styles.general_users } >
                <
                Table headers = { headers }
                data = { patients }
                keyName = { "id_clinic_history" }
                actionItem = { showPatientMenu }
                /> <
                SettingsAdminPatients / >
                <
                /div> {
                    showModal && < Modal > { childModal } < /Modal>} <
                        />
                );
            }