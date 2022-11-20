import React, { useEffect, useState } from "react";
import Table from "components/TableDependencies/TableDependencies";
import styles from "./styles.module.css";
import icon_Filter from "./images/Icon_Filter.png";
import { useAdminDependencies } from "hooks/useAdminDependencies";
import SettingsAdminDepedencies from "components/SettingsAdminDependencies";
import {
  filterDependencies,
  filterDependenciesName,
} from "constants/constants";
import { typeDependencies } from "constants/constants";
import PanelSearch from "components/PanelSearch";
import { Modal } from "components/Modal/Index";
import ShowDependency from "components/ShowDependency/ShowDependency";

export default function AdminDependencies() {
  const [typeFilter, setTypeFilter] = useState([]);
  const [typeFilterId, setTypeFilterId] = useState(0);
  const [askFilter, setAskFilter] = useState();
  const [disableItems, setDisableItems] = useState();
  const [disableSelectFilters, setDisableSelectFilters] = useState();
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<></>);

  const {
    dependencies,
    headers,
    orderDependency,
    askDependencyName,
    askDependencyType,
  } = useAdminDependencies();

  useEffect(() => {
    if (typeFilterId == "1") {
      setTypeFilter(filterDependenciesName);
    } else if (typeFilterId == "2") {
      setTypeFilter(typeDependencies);
    }
  }, [typeFilterId]);

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

  const onSubmitDependency = () => {
    console.log();
  };

  const askDependency = (keyword) => {
    askDependencyName(keyword);
  };

  const handleTypeFilter = (event) => {
    setDisableItems(true);
    setDisableSelectFilters(false);
    setTypeFilterId(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filterDependenciesFunction = () => {
    if (typeFilterId == 1) {
      orderDependency(askFilter);
    } else if (typeFilterId == 2) {
      askDependencyType(askFilter);
    }
  };

  const handleAskFilter = (event) => {
    setDisableSelectFilters(true);
    setAskFilter(event.target.value);
  };

  console.log("Las dependencias son : ");
  console.log(dependencies);

  return (
    <>
      <div className={styles.general_users}>
        <h1>Gestión de Dependencias</h1>

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
