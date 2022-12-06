import React, { useState } from "react";
import Table from "components/AuditorComponents/AuditorDependencies/TableDependencies/TableDependencies";
import styles from "./styles.module.css";
import { useAuditorDependencies } from "hooks/AuditorHooks/DependenciesHooks/useAuditorDependencies";
import { Modal } from "components/GeneralComponents/Modal";
import ShowDependency from "components/AuditorComponents/AuditorDependencies/ShowDependency/ShowDependency";

export default function AuditorDependencies() {
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<> </>);

  const { dependencies, headers } = useAuditorDependencies();

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
      {showModal && <Modal> {childModal} </Modal>}{" "}
    </>
  );
}
