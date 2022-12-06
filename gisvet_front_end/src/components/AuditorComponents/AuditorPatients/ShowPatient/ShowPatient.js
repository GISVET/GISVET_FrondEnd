//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableDetailPatient/TableDetailPatient";

//=====Importaciones de hooks ====
import { useAuditorOnePatient } from "hooks/AuditorHooks/PatientsHooks/useAuditorOnePatient";

//=====Importaciones de imagenes ====
import icon_dependencie_settings from "./images/icon_show_dep.png";

export default function ShowPatient({
  onClose,
  dataPatient,
  isReport,
}) {

  const { patient } = useAuditorOnePatient(dataPatient.id_clinic_history);
  const [dataReady, setDataReady] = useState(false);
  const [isDisable, setDisable] = useState(true);
  const [childModal, setchildModal] = useState(<></>);
  const [showModal, setShowModal] = useState(false);
  const [styleTable, setStyleTable] = useState();
  const [styleReportForm, setStyleReportForm] = useState();
  const [data, setData] = useState({
    id_clinic_history: "",
    name_patient: "",
  });

  useEffect(() => {
    setStyleTable(styles.form_add_user_general);
    setStyleReportForm(styles.form_add_user);
    if (patient != undefined) {
      setDataReady(true);
    }
    if (isReport == true) {
      setStyleTable(styles.form_user_report);
      setStyleReportForm(styles.form_report);
    }
  }, [patient]);

  const handleChange = (event) => {
    data.id_dependencie = patient.ID_DEPENDENCIE;
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
              <h1> Registro clinico del paciente </h1>
            </div>
            <div className={styleReportForm} >
              <label htmlFor="id_clinic_history">
                Id de la Historia clinica{" "}
              </label>
              <input
                name="id_clinic_history"
                disabled={true}
                onChange={handleChange}
                defaultValue={dataPatient.id_clinic_history}
                required={true}
                type="text"
              />
              <label htmlFor="name_patient">Nombre del paciente</label>
              <input
                name="name_patient"
                disabled={isDisable}
                onChange={handleChange}
                defaultValue={dataPatient.name_patient}
                required={true}
                type="text"
              />

              {dataReady ? (
                <>
                  <label className={styles.label_table_users}>
                    Registro clínico del paciente
                  </label>
                  <Table data={patient}></Table>
                </>
              ) : (
                <h3>El paciente no tiene registro clinico</h3>
              )}
              {!isReport && (
              <div className={styles.form_horizontal}>
                <input
                  className={styles.button_cancel}
                  type="submit"
                  onClick={onClose}
                  value="Regresar"
                />
              </div>)}
            </div>
          </>
        </div>
      )}
    </>
  );
}
