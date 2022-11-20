import React, { useEffect, useState } from "react";
import Table from "components/TablePatients/TablePatients";
import styles from "./styles.module.css";
import PanelSearch from "components/PanelSearch";
import icon_Filter from "./images/Icon_Filter.png";
import { useAdminPatients } from "hooks/useAdminPatients";
import SettingsAdminPatients from "components/SettingsAdminPatients";
import { filterPatients } from "constants/constants";
import { Modal } from "components/Modal/Index";

export default function AdminPatients() {
  const {patients, headers} =
    useAdminPatients();
  const [showModal] = useState(false);
  const [childModal] = useState(<></>);
  const showUserMenu = async (identifier) => {};

  console.log("Listado de pacientes en el Admin")
  console.log(patients)

  return (
    <>
      <div className={styles.general_users}>
          <Table
            headers={headers}
            data={patients}
            keyName={"id_clinic_history"}
            actionItem={showUserMenu}
          />
          <SettingsAdminPatients />
      </div>
      {showModal && <Modal>{childModal}</Modal>}
    </>
  );
}
