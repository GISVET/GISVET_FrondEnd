//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "components/AdminComponents/AdminDependencies/TableDependencies/TableDependencies";
import SettingsAdminDepedencies from "components/AdminComponents/AdminDependencies/SettingsAdminDependencies";
import ShowDependency from "components/AdminComponents/AdminDependencies/ShowDependency/ShowDependency";
import { Modal } from "components/GeneralComponents/Modal/Index";

//=====Importaciones de hooks ====
import { useAdminDependencies } from "../../../../hooks/AdminHooks/DependenciesHooks/useAdminDependencies";

//=====Importaciones de constantes ====
import { typeDependencies } from "constants/constants";

export default function AdminDependencies() {
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<></>);
  const {
    dependencies,
    headers,
    orderDependency,
    askDependencyName,
    askDependencyType,
  } = useAdminDependencies();

  const showUserMenu = async (id_dependencie) => {
    console.log(`El id en el showMenuUser es ${id_dependencie}`);
    setShowModal(true);
    setchildModal(
      <ShowDependency
        id_dependencie={id_dependencie}
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
          data={dependencies}
          keyName={"id_dependencie"}
          actionItem={showUserMenu}
        />
        <SettingsAdminDepedencies />
      </div>
      {showModal && <Modal>{childModal}</Modal>}
    </>
  );
}
