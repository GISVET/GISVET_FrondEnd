import React, { useEffect, useState } from "react";
import Table from "components/TableUsers/TableUsers";
import styles from "./styles.module.css";
import icon_Filter from "./images/Icon_Filter.png";
import SettingsAdminUser from "components/SettingsAdminUser/index";
import { useUsersAdmin } from "hooks/useAdminUsers";
import { Modal } from "components/Modal/Index";
import ShowUser from "components/ShowUser";
import PanelSearch from "components/PanelSearch";
import { filterPatients } from "constants/constants";

export default function AdminUsers() {
  const {
    loading,
    users,
    listUserToTable,
    findUserByName,
    orderUsers,
    headers,
  } = useUsersAdmin();

  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<></>);
  const [orderBy, setOrderBy] = useState();

  const showUserMenu = async (identifier) => {
    setShowModal(true);
    setchildModal(<ShowUser id={identifier} onClose={handleCloseModal} />);
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
      </div>
      {showModal && <Modal>{childModal}</Modal>}
    </>
  );
}
