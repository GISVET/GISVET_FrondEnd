import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import icon_Settings from "./images/Icon_Settings.png";
import icon_Add_Product from "./images/Icon_Add_Product.png";
import icon_Add_Lote from "./images/Icon_Add_Lote.png";
import icon_Add_Mark from "./images/Icon_Mark.png";
import icon_Register_Product from "./images/Icon_Register_Product.png";
import { Modal } from "../../components/Modal/Index";
import AddMark from "../AddMark/AddMark";
import AddLote from "../AddLote/AddLote";
import AddProduct from "../AddProduct/AddProduct";


import AssignDependency from "../../components/AssignDependency";
import { useLocation } from "wouter";
import { useUsersAdmin } from "../../hooks/useAdminUsers";
import { useAdminProducts } from "../../hooks/useAdminProducts";

import MessageConfirm from "../../components/MessageConfirm";

export default function SettingsAdminProducts() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<></>);
  const [, navigate] = useLocation();
  const { loading, addMark,addLote,addProduct} = useAdminProducts();

  const setVisibleMenu = async (event) => {
    event.preventDefault();
    activeMenu ? setActiveMenu(false) : setActiveMenu(true);
  };

  const showAddMark = async (event) => {
    event.preventDefault();
    setShowModal(true);
    setchildModal(
      <AddMark onClose={handleCloseModal} onSubmit={onsubmitAddMark} />
    );
  };

  const showAddLote = async (event) => {
    event.preventDefault();
    setShowModal(true);
    setchildModal(
      <AddLote onClose={handleCloseModal} onSubmit={onsubmitAddLote} />
    );
  };

  const showAddProduct = async (event) => {
    event.preventDefault();
    setShowModal(true);
    setchildModal(
      <AddProduct onClose={handleCloseModal} onSubmit={onsubmitAddProduct} />
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onsubmitAddMark = (dataForm) => {
    addMark(dataForm);
    setShowModal(false);
  };

  const onsubmitAddLote = (dataForm) => {
    addLote(dataForm);
    setShowModal(false);
  };

  const onsubmitAddProduct = (dataForm) => {
    console.log("El data en settings de addproduct es")
    console.log(dataForm);
    addProduct(dataForm);
    setShowModal(false);
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
              onClick={showAddMark}
              src={icon_Add_Mark}
              width="32"
              height="32"
            />

            <p>Agregar Marca</p>
          </div>

          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={showAddLote}
              src={icon_Add_Lote}
              width="32"
              height="32"
            />

            <p>Agregar Lote</p>
          </div>

          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={showAddProduct}
              src={icon_Add_Product}
              width="32"
              height="32"
            />

            <p>Agregar Producto</p>
          </div>

          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={""}
              src={icon_Register_Product}
              width="32"
              height="32"
            />

            <p>Registrar Producto</p>
          </div>
        </div>
        {showModal && <Modal>{childModal}</Modal>}
      </>
    );
  }
}
