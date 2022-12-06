//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableProducts/TableProducts";
import SettingsAdminProducts from "../SettingsAdminProducts/SettingsAdminProducts";
import ShowProducts from "../ShowProducts/ShowProducts";
import { Modal } from "components/GeneralComponents/Modal";

//=====Importaciones de hooks ====
import { useAdminProducts } from "hooks/AdminHooks/ProductsHooks/useAdminProducts";

export default function AdminProducts() {
  const { products, headers, askProductName } = useAdminProducts();
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<> </>);

  const showProductsMenu = async (data) => {
    setShowModal(true);
    console.log("El data que llega al AdminProducts es");
    console.log(data);
    setchildModal(
      <ShowProducts dataProduct={data} onClose={handleCloseModal} />
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSubmitDependency = () => {};

  return (
    <>
      <div className={styles.general_users}>
        <Table
          headers={headers}
          data={products}
          keyName={"id_product"}
          actionItem={showProductsMenu}
        />{" "}
        <SettingsAdminProducts />
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
