//=====Importaciones de React====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos====
import styles from "./styles.module.css";

//=====Importaciones de imagenes====
import icon_Filter from "./images/Icon_Filter.png";

//=====Importaciones de componentes PrimeReact====
import { Modal } from "components/GeneralComponents/Modal";

//=====Importaciones de componentes generales====
import Table from "components/AuditorComponents/AuditorPatients//TablePatients/TablePatients";
import ShowPatient from "components/AuditorComponents/AuditorPatients/ShowPatient/ShowPatient";

//=====Importaciones de hooks ====
import { useAuditorPatients } from "hooks/AuditorHooks/PatientsHooks/useAuditorPatients";

export default function AuditorPatients() {
  const { patients, headers } = useAuditorPatients();
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<> </>);

  const showPatientMenu = async (data) => {
    console.log(`El id en el showPatient es ${data}`);
    setShowModal(true);
    setchildModal(
      <ShowPatient
        dataPatient={data}
        onClose={handleCloseModal}
        onSubmit={onSubmitDependency}
      />
    );
  };

  const onSubmitDependency = () => {};

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.general_users}>
        <Table
          headers={headers}
          data={patients}
          keyName={"id_clinic_history"}
          actionItem={showPatientMenu}
        />{" "}
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
