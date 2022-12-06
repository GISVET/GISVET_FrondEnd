//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableUsers/TableUsers";
import SettingsAdminUser from "../SettingsAdminUser/index";
import { Modal } from "components/GeneralComponents/Modal";
import ShowUser from "../ShowUser";

//=====Importaciones de hooks ====
import { useUsersAdmin } from "hooks/AdminHooks/UsersHooks/useAdminUsers";


export default function AdminUsers() {
  const {
    listUserToTable,
    findUserByName,
    orderUsers,
    headers,
  } = useUsersAdmin();

  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<> </>);
  const [orderBy, setOrderBy] = useState();

  const showUserMenu = async (document) => {
    setShowModal(true);
    setchildModal(<ShowUser document={document} onClose={handleCloseModal} />);
  };
  const handleChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const search = function (keyword) {
    findUserByName(keyword);
  };
  const ordersUsers = function () {
    orderUsers(orderBy);
  };

  return (
    <>
      <div className={styles.general_users}>
        <Table
          headers={headers}
          data={listUserToTable}
          keyName={"document"}
          actionItem={showUserMenu}
        />
        <SettingsAdminUser />
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
