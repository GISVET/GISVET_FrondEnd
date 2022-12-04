//=====Importaciones de React ====
import React, {useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableDetailPatient/TableDetailPatient";
import MessageConfirm from "../../../GeneralComponents/MessageConfirm";

//=====Importaciones de componentes PrimeReact ====
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//=====Importaciones de hooks ====
import { useRolesList } from "../../../../hooks/AdminHooks/GeneralHooks/useRoles";
import { useAdminOnePatient } from "../../../../hooks/AdminHooks/PatientsHooks/useAdminOnePatient";

//=====Importaciones de imagenes ====
import icon_dependencie_settings from "./images/icon_show_dep.png";

//=====Importaciones de constantes ====
import { typeDependencies, gender, role } from "constants/constants";
import { patientshistory } from "constants/headersTables";


export default function ShowPatient({ dataPatient, onClose }) {
  const { patient } = useAdminOnePatient(dataPatient.id_clinic_history);
  const [dataReady, setDataReady] = useState(false);
  const [isDisable, setDisable] = useState(true);
  const [textButtonUpdate, setTextButtonUpdate] = useState();
  const [childModal, setchildModal] = useState(<></>);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    id_clinic_history: "",
    name_patient: "",
  });

  useEffect(() => {
    if (patient != undefined) {
      console.log("El patient en ShowPatient es ");
      console.log(patient);
      setDataReady(true);
    }
  }, [patient]);

  const handleChange = (event) => {
    data.id_dependencie = patient.ID_DEPENDENCIE;
    let { name, value } = event.target;
    let newData = { ...data, [name]: value };
    setData(newData);
  };

  console.log("El paciente completo de respuesta que lelga al ShowPatient es ");
  console.log(patient);

  return (
    <>
      {showModal ? (
        <>{childModal}</>
      ) : (
        <div className={styles.form_add_user_general}>
          <>
            <div className={styles.title_image}>
              <img src={icon_dependencie_settings} width="50" height="50" />
              <h1> Registro clinico del paciente </h1>
            </div>
            <form className={styles.form_add_user} onSubmit={""}>
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

              <div className={styles.form_horizontal}>
                <input
                  className={styles.button_accept}
                  type="submit"
                  value="Aceptar"
                />
                <input
                  className={styles.button_cancel}
                  type="submit"
                  onClick={onClose}
                  value="Cancelar"
                />
              </div>
            </form>
          </>
        </div>
      )}
    </>
  );
}