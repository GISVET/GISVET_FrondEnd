import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import icon_dependencie_settings from "./images/icon_show_dep.png";
import { useRolesList } from "../../hooks/useRoles";
import { typeDependencies, gender, role } from "../../constants/constants";
import Table from "../Table/Table";
import { useAdminOneDependency } from "../../hooks/useAdminOneDependency";
import { usersByDependency } from "../../constants/headersTables";
import MessageConfirm from "../MessageConfirm";

export default function ShowDependency({ id_dependencie, onSubmit, onClose }) {
  const { dependency, persons, formatListUsers,updateDependencyFunction} = useAdminOneDependency(
    id_dependencie
  );
  const [dataReady, setDataReady] = useState(false);
  const [isDisable, setDisable] = useState(true);
  const [textButtonUpdate, setTextButtonUpdate] = useState();
  const [childModal, setchildModal] = useState(<></>)
  const [showModal, setShowModal] = useState(false)


  const [data, setData] = useState({
    id_dependencie: "",
    dependencie_name: "",
    type_dependencie: "",
  });

  useEffect(() => {
    if (dependency != undefined) {
      setTextButtonUpdate("Modificar");
      formatListUsers();

      if (persons != undefined) {
        showPersons();
        setDataReady(true);
      }
    }
  }, [dependency]);

  const showPersons = () => {
    console.log(persons)
    persons.map((person) => {
    });
  };

  const doSubmit = (event) => {
    event.preventDefault();
    if(textButtonUpdate==="Actualizar"){
      setDisable(true);
      updateDependencyFunction(data.id_dependencie,data.dependencie_name).then(res =>{
        setchildModal(<MessageConfirm
            onClose={onClose} 
            isCorrect= {res.status == 200?true:false}
            message= {res.message}
            />) 

        return setShowModal(true)
    })
      setTextButtonUpdate("Modificar");
    }else{
      setTextButtonUpdate("Actualizar");
      setDisable(false);
    }

  };

  const handleChange = (event) => {
    data.id_dependencie = dependency.ID_DEPENDENCIE
    let { name, value } = event.target;
    let newData = { ...data, [name]: value };
    setData(newData);
  };

  return (<>{showModal? <>{childModal}</>
  :<div className={styles.form_add_user_general}>
      {dataReady && (
        <>
          <div className={styles.title_image}>
            <img src={icon_dependencie_settings} width="40" height="40" />
            <h1> Detalle Dependencia</h1>
          </div>
          <form className={styles.form_add_user} onSubmit={doSubmit}>
            <label htmlFor="id_dependency">Id del Departamento </label>
            <input
              name="id_dependencie"
              disabled={true}
              onChange={handleChange}
              defaultValue={dependency.ID_DEPENDENCIE}
              required={true}
              type="text"
            />
            <label htmlFor="dependency_name">Nombre de la dependencia </label>
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
            <label className={styles.label_table_users}> Usuarios pertenecientes a la dependencia </label>
            <Table
              headers={usersByDependency}
              data={persons}
            />

            <div className={styles.form_horizontal}>
              <input
                className={styles.button_accept}
                type="submit"
                value={textButtonUpdate}
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
      )}
    </div>
  }</>);
}
