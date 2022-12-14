/* eslint-disable jsx-a11y/alt-text */
//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de imagenes ====
import icon_Settings from "./images/Icon_Settings.png";
import { ReactComponent as Token_icon } from "./images/token_icon.svg";
import icon_Register_Product from "./images/Icon_Register_Product.png";

//=====Importaciones de componentes generales ====
import { Modal } from "components/GeneralComponents/Modal";
import MessageConfirm from "components/GeneralComponents/MessageConfirm";
import ConfirmGenerateToken from "../ConfirmGenerateToken/ConfirmGenerateToken";
import Loading from "components/GeneralComponents/Loading";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";

//=====Importaciones de hooks ====
import useUser from "hooks/UserHooks/useUser";

export default function SettingsFarmacyProducts({
  sendProducts,
  setSendProducts,
}) {

  const {generateTokenAuth} = useUser()
  const [activeMenu, setActiveMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<> </>);
  const [, navigate] = useLocation();

  const setVisibleMenu = async (event) => {
    event.preventDefault();
    activeMenu ? setActiveMenu(false) : setActiveMenu(true);
  };

  const showGenerateToken = async (event) => {
    event.preventDefault();
    setShowModal(true);
    setchildModal(
      <ConfirmGenerateToken onClose={handleCloseModal} onSubmit={onsubmitGenerateToken} />
    );
  };


  const ShowEditableTable = (event) => {
    event.preventDefault();
    setSendProducts(sendProducts ? false : true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onsubmitGenerateToken = () => {
    setchildModal(<Loading text="Enviando Token al correo"></Loading>)
    setShowModal(true);
    return generateTokenAuth().then((res) => {
      setchildModal(
        <MessageConfirm
          onClose={handleCloseModal}
          isCorrect={res.status === 200 ? true : false}
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
            <div 
              className={styles.token_content}
              onClick={showGenerateToken}
            > 
              <Token_icon/>
            </div>
            <p> generar Token </p>
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
            <p> Devolver a farmacia </p>
          </div>
        </div>
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
