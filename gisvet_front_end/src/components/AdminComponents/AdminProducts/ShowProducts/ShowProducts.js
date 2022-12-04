//=====Importaciones de React ====
import React, { useContext, useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableDetailProducts/TableDetailProducts";

//=====Importaciones de hooks ====
import { useAdminOneProduct } from "hooks/AdminHooks/ProductsHooks/useAdminOneProduct";

//=====Importaciones de imagenes ====
import icon_dependencie_settings from "./images/icon_show_dep.png";

//=====Importaciones de constantes ====
import { presentations } from "constants/constants";

export default function ShowProducts({ dataProduct, onClose }) {
  const presentation = presentations.find(
    (element) => element.name === dataProduct.presentation
  );
  const { product } = useAdminOneProduct(
    dataProduct.id_product,
    presentation.id
  );
  const [dataReady, setDataReady] = useState(false);
  const [isDisable, setDisable] = useState(true);
  const [childModal, setchildModal] = useState(<></>);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    id_clinic_history: "",
    name_patient: "",
  });

  useEffect(() => {
    if (product != undefined) {
      if (product.length != 0) {
        setDataReady(true);
      }
    }
  }, [product]);

  const handleChange = (event) => {
    data.id_dependencie = product.ID_DEPENDENCIE;
    let { name, value } = event.target;
    let newData = { ...data, [name]: value };
    setData(newData);
  };

  return (
    <>
      {showModal ? (
        <>{childModal}</>
      ) : (
        <div className={styles.form_add_user_general}>
          <>
            <div className={styles.title_image}>
              <img src={icon_dependencie_settings} width="50" height="50" />
              <h1> Especificación del producto </h1>
            </div>
            <form className={styles.form_add_user} onSubmit={""}>
              <div className={styles.form_horizontal}>
                <div className={styles.input_horizontal}>
                  <label htmlFor="id_clinic_history">Id del producto</label>
                  <input
                    name="id_clinic_history"
                    disabled={true}
                    onChange={handleChange}
                    defaultValue={dataProduct.id_product}
                    required={true}
                    type="text"
                  />
                </div>
                <div className={styles.input_horizontal}>
                  <label htmlFor="name_patient">Nombre del producto</label>
                  <input
                    name="name_patient"
                    disabled={isDisable}
                    onChange={handleChange}
                    defaultValue={dataProduct.product_name}
                    required={true}
                    type="text"
                  />
                </div>
              </div>
              <div className={styles.form_horizontal}>
                <div className={styles.input_horizontal}>
                  <label htmlFor="name_patient">Unidad de medida</label>
                  <input
                    name="name_patient"
                    disabled={isDisable}
                    onChange={handleChange}
                    defaultValue={dataProduct.measurement_units}
                    required={true}
                    type="text"
                  />
                </div>
                <div className={styles.input_horizontal}>
                  <label htmlFor="name_patient">
                    Presentación del producto
                  </label>
                  <input
                    name="name_patient"
                    disabled={isDisable}
                    onChange={handleChange}
                    defaultValue={dataProduct.presentation}
                    required={true}
                    type="text"
                  />
                </div>
              </div>
              <div className={styles.form_horizontal}>
                <div className={styles.input_horizontal}>
                  <label htmlFor="name_patient">
                    Cantidad total del producto
                  </label>
                  <input
                    name="name_patient"
                    disabled={isDisable}
                    onChange={handleChange}
                    defaultValue={dataProduct.quantity}
                    required={true}
                    type="text"
                  />
                </div>
                <div className={styles.input_horizontal}>
                  <label htmlFor="name_patient">Tipo de producto</label>
                  <input
                    name="name_patient"
                    disabled={isDisable}
                    onChange={handleChange}
                    defaultValue={dataProduct.type_product}
                    required={true}
                    type="text"
                  />
                </div>
              </div>

              {dataReady ? (
                <>
                  <label className={styles.label_table_users}>
                    Caracteristicas del producto
                  </label>
                  <Table data={product}></Table>
                </>
              ) : (
                <h3 className={styles.title_error}>
                  El producto no tiene historial vigente
                </h3>
              )}

              <div className={styles.form_horizontal}>
                <input
                  className={styles.button_accept}
                  type="submit"
                  value="Volver"
                  onClick={onClose}
                />
              </div>
            </form>
          </>
        </div>
      )}
    </>
  );
}
