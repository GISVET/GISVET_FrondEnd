//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import { Modal } from "../../../GeneralComponents/Modal/Index";
import AddMark from "../AddMark/AddMark";
import AddLote from "../AddLote/AddLote";
import AddProduct from "../AddProduct/AddProduct";
import MessageConfirm from "../../../GeneralComponents/MessageConfirm";
import AddItemProduct from "../AddItemProduct";

//=====Importaciones de hooks ====
import { useAdminProducts } from "../../../../hooks/AdminHooks/ProductsHooks/useAdminProducts";

//=====Importaciones de imagenes ====
import icon_Settings from "./images/Icon_Settings.png";
import icon_Add_Product from "./images/Icon_Add_Product.png";
import icon_Add_Lote from "./images/Icon_Add_Lote.png";
import icon_reports from "./images/Icon_Reports.png";
import icon_Add_Mark from "./images/Icon_Mark.png";
import icon_Register_Product from "./images/Icon_Register_Product.png";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";

export default function SettingsAdminProducts() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<></>);
  const [, navigate] = useLocation();
  const { loading, addMark, addLote, addProduct, addItem } = useAdminProducts();

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

  const ShowAddItemProduct = async (event) => {
    event.preventDefault();
    setShowModal(true);
    setchildModal(
      <AddItemProduct onClose={handleCloseModal} onSubmit={onsubmitAddItem} />
    );
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

  const onsubmitAddLote = (dataForm) => {
    return addLote(dataForm).then((res) => {
      if (res.status == 200) {
        res.message = "Se agrego el lote exitosamente";
      }
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
              onClick={ShowAddItemProduct}
              src={icon_Register_Product}
              width="32"
              height="32"
            />

            <p>Registrar Producto</p>
          </div>

          <div className={styles.item_floatMenu}>
            <input
              className={styles.add_user_form}
              type="image"
              onClick={ShowAddItemProduct}
              src={icon_reports}
              width="32"
              height="32"
            />

            <p>Reportes</p>
          </div>
        </div>
        {showModal && <Modal>{childModal}</Modal>}
      </>
    );
  }
}
