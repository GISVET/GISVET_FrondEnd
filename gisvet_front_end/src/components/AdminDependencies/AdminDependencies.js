import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import styles from "./styles.module.css";
import icon_Filter from "./images/Icon_Filter.png";
import { useAdminDependencies } from "../../hooks/useAdminDependencies";
import SettingsAdminDepedencies from "../SettingsAdminDependencies";
import {
  filterDependencies,
  filterDependenciesName,
} from "../../constants/constants";
import { typeDependencies } from "../../constants/constants";
import PanelSearch from "../../components/PanelSearch";
import { Modal } from "../../components/Modal/Index"; 
import ShowDependency from "../ShowDependency/ShowDependency";

export default function AdminDependencies() {
  const [typeFilter, setTypeFilter] = useState([]);
  const [typeFilterId, setTypeFilterId] = useState(0);
  const [askFilter, setAskFilter] = useState();
  const [disableItems,setDisableItems]  = useState();
  const [disableSelectFilters,setDisableSelectFilters]  = useState();
  const [showModal, setShowModal] = useState(false)
  const [childModal, setchildModal] = useState(<></>)


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
    console.log(`El id en el showMenuUser es ${id_dependencie}`)
    setShowModal(true)
    setchildModal(<ShowDependency
        id_dependencie={id_dependencie}
        onClose={handleCloseModal} 
        onSubmit={onSubmitDependency}
       />) 
  };

  const onSubmitDependency = ()=>{
        console.log()
  };

  const askDependency = (keyword) => {
    askDependencyName(keyword);
  };

  const handleTypeFilter = (event) => {
    setDisableItems(true);
    setDisableSelectFilters(false);
    setTypeFilterId(event.target.value);
  };

  const handleCloseModal = ()=>{
    setShowModal(false)
}

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

  return (<>
    <div className={styles.general_users}>
      <h1>Gestión de Dependencias</h1>
      <div className={styles.table_users}>
        <div className={styles.filter_users}>
          <PanelSearch onSubmit={askDependency} />
          <div className={styles.buscador}>
            <select
              placeholder="Filtrar"
              onChange={handleTypeFilter}
              className={styles.filter_dependencies}
              type="text"
            >
              {filterDependencies.map((type, index) => {
                if (index == 0) {
                  return (
                    <>
                      <option key={0} disabled={disableItems} defaultValue={true}>
                        Seleccionar
                      </option>
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    </>
                  );
                } else {
                  return (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  );
                }
              })}
              ;
            </select>
            <select
              selected
              placeholder="Filtrar"
              onChange={handleAskFilter}
              className={styles.filter_dependencies_option}
              type="text"
            >
              {typeFilter.map((type, index) => {
                if (index == 0) {
                  return (
                    <>
                      <option key={0} disabled={disableSelectFilters} defaultValue={true}>
                        Seleccionar
                      </option>
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    </>
                  );
                } else {
                  return (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  );
                }
              })}
              ;
            </select>
            <input
              type="image"
              src={icon_Filter}
              onClick={filterDependenciesFunction}
              className={styles.image_buscar}
            />
          </div>
        </div>

        <Table
          headers={headers}
          data={dependencies}
          keyName={"id_dependencie"}
          actionItem={showUserMenu}
        />
        <SettingsAdminDepedencies />
      </div>
    </div>
            {showModal && <Modal>{childModal}</Modal>
                        
          }
      </>
  );
}
