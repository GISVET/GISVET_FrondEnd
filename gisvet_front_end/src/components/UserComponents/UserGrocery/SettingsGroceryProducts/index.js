/* eslint-disable jsx-a11y/alt-text */
//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de imagenes ====
import icon_Settings from "./images/Icon_Settings.png";
import icon_Add_Product from "./images/Icon_Add_Product.png";
import icon_Add_Mark from "./images/Icon_Mark.png";
import icon_Register_Product from "./images/Icon_Register_Product.png";

//=====Importaciones de componentes generales ====
import { Modal } from "components/GeneralComponents/Modal";
import AddMark from "components/AdminComponents/AdminProducts/AddMark/AddMark";
import AddProduct from "components/AdminComponents/AdminProducts/AddProduct/AddProduct";
import MessageConfirm from "components/GeneralComponents/MessageConfirm";
import AddItemProduct from "components/AdminComponents/AdminProducts/AddItemProduct";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";

//=====Importaciones de hooks ====
import { useGroceryProducts } from "hooks/UserHooks/useGroceryProducts";

export default function SettingsAdminProducts({
  sendProducts,
  setSendProducts,
}) {
  const [activeMenu, setActiveMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<> </>);
  const [, navigate] = useLocation();
  const { addMark, addProduct, addItem } = useGroceryProducts();

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

  const showAddProduct = async (event) => {
    event.preventDefault();
    setShowModal(true);
    setchildModal(
      <AddProduct onClose={handleCloseModal} onSubmit={onsubmitAddProduct} />
    );
  };

  const ShowAddItemProduct = async (event) => {
    event.preventDefault();
    setShowModal(true);
    setchildModal(
      <AddItemProduct onClose={handleCloseModal} onSubmit={onsubmitAddItem} />
    );
  };

  const ShowEditableTable = (event) => {
    event.preventDefault();
    setSendProducts(sendProducts ? false : true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onsubmitAddMark = (dataForm) => {
    return addMark(dataForm).then((res) => {
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

  const onsubmitAddItem = (dataForm) => {
    return addItem(dataForm).then((res) => {
      console.log(res);
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

  const onsubmitAddProduct = (dataForm) => {
    return addProduct(dataForm).then((res) => {
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
          className={styles.settings_clicked}
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
            className={styles.settings_show}
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

            <p> Agregar Marca </p>
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

            <p> Agregar Producto </p>
          </div>

          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={ShowAddItemProduct}
              src={icon_Register_Product}
              width="32"
              height="32"
            />

            <p> Registrar Producto </p>
          </div>

          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={ShowEditableTable}
              src={icon_Register_Product}
              width="32"
              height="32"
            />

            <p> Enviar Productos </p>
          </div>
        </div>{" "}
        {showModal && 
          <Modal
            onClose={handleCloseModal}
            >
            {childModal}
          </Modal>
        }
      </>
    );
  }
}
