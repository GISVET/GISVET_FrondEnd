//=====Importaciones de React====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos====
import styles from "./styles.module.css";

//=====Importaciones de enrutamiento====
import { useLocation } from "wouter";

//=====Importaciones de imagenes====
import icon_Settings from "./images/Icon_Settings.png";
import icon_Add_Dependency from "./images/Icon_Add_Dependency.png";
import icon_reports from "./images/Icon_Reports.png";

//=====Importaciones de componentes PrimeReact====
import { Modal } from "components/GeneralComponents/Modal";

//=====Importaciones de componentes generales ====
import AddDependency from "../AddDependency";
import MessageConfirm from "components/GeneralComponents/MessageConfirm";
import Loading from "components/GeneralComponents/Loading";

//=====Importaciones de hooks ====
import { useAdminDependencies } from "hooks/AdminHooks/DependenciesHooks/useAdminDependencies";
import ShowDependenciesReports from "../ShowDependenciesReports/ShowDependenciesReports";

export default function SettingsAdminDepedencies() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [, navigate] = useLocation();
  const { loading, addDependency } = useAdminDependencies();
  const [childModal, setchildModal] = useState(<> </>);

  const setVisibleMenu = async (event) => {
    event.preventDefault();
    activeMenu ? setActiveMenu(false) : setActiveMenu(true);
  };

  const showReports = async (event) => {
    event.preventDefault();
    setchildModal(
      <ShowDependenciesReports
        onClose={handleCloseModal}
      />
    );
    return setShowModal(true);
  };

  const showAddDependencyMenu = async (event) => {
    event.preventDefault();
    setchildModal(
      <AddDependency
        onSubmit={onsubmit}
        onClose={handleCloseModal}
      />
    );
    return setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onsubmit = (data) => {
    setchildModal(<Loading text="Creando Dependencia" sizeIn={80}></Loading>)
    setShowModal(true)
    return addDependency(data).then((res) => {
      setchildModal(
        <MessageConfirm
          onClose={handleCloseModal}
          isCorrect={res.status == 200 ? true : false}
          message={res.message}
        />
      );
      return setShowModal(true);
    });
  };

  if (!activeMenu) {
    return (
      <div className={styles.options_admin}>
        <input
          type="image"
          onClick={setVisibleMenu}
          src={icon_Settings}
          width="45"
          height="45"
        />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.options_admin_visible}>
          <input
            className={styles.settings_hide}
            type="image"
            onClick={setVisibleMenu}
            src={icon_Settings}
            width="45"
            height="45"
          />
          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={showAddDependencyMenu}
              src={icon_Add_Dependency}
              width="40"
              height="40"
            />
            <p> Agregar </p>{" "}
          </div>
          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={showReports}
              src={icon_reports}
              width="40"
              height="40"
            />
            <p> Reportes </p>{" "}
          </div>{" "}
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
}
