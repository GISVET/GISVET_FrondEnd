//===== Importaciones de react ====
import React, { useContext, useEffect, useState } from "react";

//===== Importaciones de estilos ====
import styles from "./styles.module.css";

//===== Importaciones de imagenes ====
import icon_dependencie_settings from "./images/icon_show_dep.png";

//===== Importaciones de hooks ====
import { useAuditorOneDependency } from "hooks/AuditorHooks/DependenciesHooks/useAuditorOneDependency";

//===== Importaciones de constantes ====
import { typeDependencies, gender, role } from "constants/constants";
import { usersByDependency } from "constants/headersTables";

//===== Importaciones de componentes ====
import Table from "components/GeneralComponents/Table/Table";
import MessageConfirm from "components/GeneralComponents/MessageConfirm";
import Loading from "components/GeneralComponents/Loading";

//===== Importaciones de componentes PrimeReact ====

export default function ShowDependency({ id_dependencie, onClose, isReport }) {
  const { dependency, persons, formatListUsers, updateDependencyFunction, loading} =
  useAuditorOneDependency(id_dependencie);
  const [dataReady, setDataReady] = useState(false);
  const [isDisable, setDisable] = useState(true);
  const [isUsers, setIsUsers] = useState(false);

  const [textButtonUpdate, setTextButtonUpdate] = useState();
  const [childModal, setchildModal] = useState(<></>);
  const [showModal, setShowModal] = useState(false);
  const [styleTable, setStyleTable] = useState();
  const [styleReportForm, setStyleReportForm] = useState();

  const [data, setData] = useState({
    id_dependencie: "",
    dependencie_name: "",
    type_dependencie: "",
  });

  useEffect(() => {
    setStyleTable(styles.form_add_user_general);
    setStyleReportForm(styles.form_add_user);
    if (dependency != undefined) {
      setTextButtonUpdate("Modificar");
      formatListUsers();

      if (persons != undefined) {
        setDataReady(true);
        if (persons.length != 0) {
          setIsUsers(true);
        }
      }

      if (isReport == true) {
        setStyleTable(styles.form_user_report);
        setStyleReportForm(styles.form_report);
      }
    }
  }, [dependency]);

  const doSubmit = (event) => {
    event.preventDefault();
    if (textButtonUpdate === "Actualizar") {
      setDisable(true);
      updateDependencyFunction(data.id_dependencie, data.dependencie_name).then(
        (res) => {
          setchildModal(
            <MessageConfirm
              onClose={onClose}
              isCorrect={res.status == 200 ? true : false}
              message={res.message}
            />
          );

          return setShowModal(true);
        }
      );
      setTextButtonUpdate("Modificar");
    } else {
      setTextButtonUpdate("Actualizar");
      setDisable(false);
    }
  };

  const handleChange = (event) => {
    data.id_dependencie = dependency.ID_DEPENDENCIE;
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
          {dataReady? (
            <>
              <div className={styles.title_image}>
                <img src={icon_dependencie_settings} width="40" height="40" />
                <h1> Detalle Dependencia</h1>
              </div>
              <form className={styleReportForm} onSubmit={doSubmit}>
                <label htmlFor="id_dependency">Id del Departamento </label>
                <input
                  name="id_dependencie"
                  disabled={true}
                  onChange={handleChange}
                  defaultValue={dependency.ID_DEPENDENCIE}
                  required={true}
                  type="text"
                />
                <label htmlFor="dependency_name">
                  Nombre de la dependencia{" "}
                </label>
                <input
                  name="dependencie_name"
                  disabled={isDisable}
                  onChange={handleChange}
                  defaultValue={dependency.DEPENDENCIE_NAME}
                  required={true}
                  type="text"
                />
                <label htmlFor="type_dependency">Tipo de dependencia </label>
                <input
                  name="type_dependency"
                  disabled={true}
                  onChange={handleChange}
                  defaultValue={
                    typeDependencies.find(
                      (element) => element.id === dependency.TYPE_DEPENDENCIE
                    ).name
                  }
                  required={true}
                  type="text"
                />
                {loading?
                  <Loading text="Cargando usuarios de la dependencia"></Loading>
                :isUsers ? (
                  <>
                    <label className={styles.label_table_users}>
                      Usuarios pertenecientes a la dependencia{" "}
                    </label>
                    <Table headers={usersByDependency} data={persons} />
                  </>
                ) : (
                  <label className={styles.label_error}>
                    La dependencia no tiene usuarios asignados
                  </label>
                )}
                {!isReport&&(
                <div className={styles.form_horizontal}>
                  <input
                    className={styles.button_cancel}
                    type="submit"
                    onClick={onClose}
                    value="Regresar"
                  />
                </div>)}
              </form>
            </>
          )
          :<Loading text="Cargando dependencia"></Loading>
          }
        </div>
      )}
    </>
  );
}
