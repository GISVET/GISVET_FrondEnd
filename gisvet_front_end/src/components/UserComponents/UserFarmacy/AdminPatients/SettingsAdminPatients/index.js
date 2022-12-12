//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import { Modal } from "components/GeneralComponents/Modal";
import AddPatient from "../AddPatient";
import MessageConfirm from "components/GeneralComponents/MessageConfirm";

//=====Importaciones de hooks ====
import { useAdminPatients } from "hooks/AdminHooks/PatientsHooks/useAdminPatients";

//=====Importaciones de imagenes ====
import icon_Settings from "./images/Icon_Settings.png";
import icon_Add_Patient from "./images/Icon_Add_Patient.png";
import icon_reports from "./images/Icon_Reports.png";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";
import ShowPatientsReports from "../ShowPatientsReports/ShowPatientsReports";

export default function SettingsAdminPatients() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [, navigate] = useLocation();
  const { loading, addPatient } = useAdminPatients();
  const [childModal, setchildModal] = useState(<> </>);

  const [data, setData] = useState({
    id_clinic_history: "",
    name_patient: "",
  });

  const setVisibleMenu = async (event) => {
    event.preventDefault();
    activeMenu ? setActiveMenu(false) : setActiveMenu(true);
  };

  const showAddPatientsMenu = async (event) => {
    event.preventDefault();
    setchildModal(
      <AddPatient onClose={handleCloseModal} onSubmit={onsubmit} />
    );
    return setShowModal(true);
  };

  const showReport = async (event) => {
    event.preventDefault();
    setchildModal(
      <ShowPatientsReports onClose={handleCloseModal} />
    );
    return setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onsubmit = async (data) => {
    return addPatient(data).then((res) => {
      setchildModal(
        <MessageConfirm
          onClose={handleCloseModal}
          isCorrect={res.status == 200 ? true : false}
          message={res.message}
        />
      );
      return setShowModal(true);
    });
  };

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    let newData = { ...data, [name]: value };
    setData(newData);
  };

  if (!activeMenu) {
    return (
      <div className={styles.options_admin}>
        <input
          type="image"
          onClick={setVisibleMenu}
          src={icon_Settings}
          width="45"
          height="45"
        />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.options_admin_visible}>
          <input
            className={styles.settings_hide}
            type="image"
            onClick={setVisibleMenu}
            src={icon_Settings}
            width="45"
            height="45"
          />
          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={showAddPatientsMenu}
              src={icon_Add_Patient}
              width="40"
              height="40"
            />
            <p> Agregar </p>{" "}
          </div>{" "}
          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={showReport}
              src={icon_reports}
              width="40"
              height="40"
            />
            <p> Reportes </p>{" "}
          </div>{" "}
        </div>{" "}
        {showModal && 
        <Modal
          onClose={handleCloseModal}
          >
          {childModal}
        </Modal>
      }{" "}
      </>
    );
  }
}
