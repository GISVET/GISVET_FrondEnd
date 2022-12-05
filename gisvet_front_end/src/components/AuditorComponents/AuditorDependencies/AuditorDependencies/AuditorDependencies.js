import React, { useEffect, useState } from "react";
import Table from "components/AdminComponents/AdminDependencies/TableDependencies/TableDependencies";
import styles from "./styles.module.css";
import { useAdminDependencies } from "hooks/AuditorHooks/DependenciesHooks/useAuditorDependencies";
import { typeDependencies } from "constants/constants";
import { Modal } from "components/GeneralComponents/Modal";
import ShowDependency from "components/AdminComponents/AdminDependencies/ShowDependency/ShowDependency";

export default function AuditorDependencies() {
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<> </>);

  const { dependencies, headers } = useAdminDependencies();

  const showUserMenu = async (id_dependencie) => {
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
