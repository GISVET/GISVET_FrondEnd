//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableProducts/TableProducts";
import ShowProducts from "../ShowProducts/ShowProducts";
import { Modal } from "components/GeneralComponents/Modal";

//=====Importaciones de hooks ====
import { useAuditorProducts } from "hooks/AuditorHooks/ProductsHooks/useAuditorProducts";

export default function AuditorProducts() {
  const { products, headers, askProductName } = useAuditorProducts();
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
      </div>{" "}
      {showModal && <Modal> {childModal} </Modal>}{" "}
    </>
  );
}
