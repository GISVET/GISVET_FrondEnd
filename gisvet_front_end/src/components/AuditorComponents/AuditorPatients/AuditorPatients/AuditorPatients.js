import React, { useEffect, useState } from "react";
import Table from "components/AdminComponents/AdminPatients/TablePatients/TablePatients";
import styles from "./styles.module.css";
import PanelSearch from "components/PanelSearch";
import icon_Filter from "./images/Icon_Filter.png";
import { useAdminPatients } from "hooks/useAdminPatients";
import SettingsAdminPatients from "components/AdminComponents/AdminPatients/SettingsAdminPatients";
import { filterPatients } from "constants/constants";
import ShowPatient from "components/AdminComponents/AdminPatients/ShowPatient/ShowPatient";
import { Modal } from "components/GeneralComponents/Modal";

export default function AuditorPatients() {
  const {patients, headers} =
    useAdminPatients();
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<></>);



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

  const onSubmitDependency = () => {
  };

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
          />
          <SettingsAdminPatients />
      </div>
      {showModal && <Modal>{childModal}</Modal>}
    </>
  );
}
