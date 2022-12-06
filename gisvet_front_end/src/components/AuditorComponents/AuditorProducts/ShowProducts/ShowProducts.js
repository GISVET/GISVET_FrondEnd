//=====Importaciones de React ====
import React, { useContext, useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableDetailProducts/TableDetailProducts";
import Loading from "components/GeneralComponents/Loading";

//=====Importaciones de hooks ====
import { useAuditorOneProduct } from "hooks/AuditorHooks/ProductsHooks/useAuditorOneProduct";

//=====Importaciones de imagenes ====
import icon_dependencie_settings from "./images/icon_show_dep.png";

//=====Importaciones de constantes ====
import { presentations } from "constants/constants";

export default function ShowProducts({ dataProduct, onClose , isReport}) {


  const presentation = presentations.find(
    (element) => element.name === dataProduct.presentation
  );
  const { product,loading } = useAuditorOneProduct(
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

  const [styleTable, setStyleTable] = useState();
  const [styleReportForm, setStyleReportForm] = useState();

  useEffect(() => {
    setStyleTable(styles.form_add_user_general);
    setStyleReportForm(styles.form_add_user);
    if (product != undefined) {
      if (product.length != 0) {
        setDataReady(true);
      }
      if (isReport == true) {
        setStyleTable(styles.form_user_report);
        setStyleReportForm(styles.form_report);
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
        <div className={styleTable}>
          <>
            <div className={styles.title_image}>
              <img src={icon_dependencie_settings} width="50" height="50" />
              <h1> Especificación del producto </h1>
            </div>
            <form className={styleReportForm} onSubmit={""}>
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

              {loading?
              <Loading text="Consultando historial producto"></Loading>
              :dataReady ? (
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

              {!isReport && (

              <div className={styles.form_horizontal}>
                <input
                  className={styles.button_accept}
                  type="submit"
                  value="Volver"
                  onClick={onClose}
                />
              </div>)}
            </form>
          </>
        </div>
      )}
    </>
  );
}
