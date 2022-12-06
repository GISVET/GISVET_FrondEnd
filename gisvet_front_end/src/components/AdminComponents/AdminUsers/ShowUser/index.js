//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "components/GeneralComponents/Table/Table";
import MessageConfirm from "components/GeneralComponents/MessageConfirm";
import Loading from "components/GeneralComponents/Loading";

//=====Importaciones de hooks ====
import { useRolesList } from "hooks/AdminHooks/GeneralHooks/useRoles";
import { useAdminOneUser } from "hooks/AdminHooks/UsersHooks/useAdminOneUser";

//=====Importaciones de imagenes ====
import icon_User_settings from "./images/Icon_settings.png";

//=====Importaciones de constantes ====
import { typeDoc, gender, role } from "constants/constants";

export default function ShowUser({ document, onClose, isReport }) {
  console.log(document);
  const {
    user,
    headersDependencies,
    roles,
    dependencies,
    dependeciesToTable,
    updateUser,
  } = useAdminOneUser(document);

  const { loading, listRoles } = useRolesList();
  const [isMatchPassword, setIsMatchPassword] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [dataReady, setDataReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const typeDocuments = typeDoc;
  const [classPassword, setClassPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<></>);
  const [styleTable, setStyleTable] = useState();
  const [styleReportForm, setStyleReportForm] = useState();

  const [data, setData] = useState({
    full_name: "",
    document_type: "",
    document: "",
    gender: "",
    professional_id: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    setStyleTable(styles.form_add_user_general);
    setStyleReportForm(styles.form_add_user);
    if (listRoles.length != 0) {
      if (user != undefined) {
        setDataReady(true);
      }
      if (isReport == true) {
        setStyleTable(styles.form_user_report);
        setStyleReportForm(styles.form_report);
      }
      console.log("El style table final es  : ");
      console.log(styleTable);
    }
  }, [loading, user]);

  const doSubmit = (event) => {
    event.preventDefault();
    setchildModal(<Loading text="Actualizando Usuario" sizeIn={80}></Loading>)
    setShowModal(true)
    if (isMatchPassword && !isDisable) {
      updateUser(user, data).then((res) => {
        setchildModal(
          <MessageConfirm
            onClose={onClose}
            isCorrect={res.status == 200 ? true : false}
            message={res.message}
          />
        );
        setShowModal(true);
      });
    }
  };

  const passData = () => {
    let newData = {
      ...data,
      ["full_name"]: user.FULL_NAME,
      ["document_type"]: user.DOCUMENT_TYPE,
      ["document"]: user.DOCUMENT,
      ["gender"]: user.GENDER,
      ["professional_id"]: user.PROFESSIONAL_ID,
      ["email"]: user.EMAIL,
    };
    setData(newData);
  };

  const cancelChanges = (event) => {
    event.preventDefault();
    setIsDisable(true);
  };

  const setDataUser = function () {
    setIsDisable(false);
    passData();
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    let newData = { ...data, [name]: value };
    setData(newData);
    if (name == "password") {
      verifyPassword(event);
    }
  };

  const verifyPassword = async (event) => {
    if (data.password == event.target.value && data.password.length >= 8) {
      setIsMatchPassword(true);
      setClassPassword("");
    } else {
      if (data.password.length < 8) {
        setErrorMessage("La contraseña debe contener minimo 8 caracteres");
      } else {
        setErrorMessage("Las contraseñas no coinciden");
      }
      setIsMatchPassword(false);
      setClassPassword(styles.error_message_input);
    }
  };

  return (
    <>
      {showModal ? (
        <>{childModal}</>
      ) : (
        <div className={styleTable}>
          {dataReady ? (
            <>
              <div className={styles.title_image}>
                <img src={icon_User_settings} width="40" height="40" />
                <h1> Detalle Usuario</h1>
              </div>
              <form className={styleReportForm} onSubmit={doSubmit}>
                <label htmlFor="full_name">Nombre de Usuario</label>
                <input
                  name="full_name"
                  disabled={isDisable}
                  onChange={handleChange}
                  defaultValue={user.FULL_NAME}
                  required={true}
                  type="text"
                />

                <div className={styles.form_horizontal}>
                  <div className={styles.input_horizontal}>
                    {isDisable ? (
                      <>
                        <label htmlFor="documentshow">Tipo Documento</label>
                        <input
                          name="documentshow"
                          disabled={isDisable}
                          value={
                            typeDoc.find(
                              (element) => element.id === user.DOCUMENT_TYPE
                            ).name
                          }
                          type="text"
                        />
                      </>
                    ) : (
                      <>
                        <label htmlFor="document_type">Tipo de Documento</label>
                        <select
                          className={styles.document_type}
                          onChange={handleChange}
                          required={true}
                          name="document_type"
                        >
                          <option disabled={true}></option>
                          {typeDocuments.map((type) => (
                            <>
                              {type.id === user.DOCUMENT_TYPE ? (
                                <option key={type.id} value={type.id} selected>
                                  {type.name}
                                </option>
                              ) : (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              )}
                            </>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                  <div className={styles.input_horizontal}>
                    <label htmlFor="document">Número de Identificación</label>
                    <input
                      type="number"
                      disabled={isDisable}
                      required={true}
                      onChange={handleChange}
                      defaultValue={user.DOCUMENT}
                      name="document"
                      className={styles.id_document}
                    />
                  </div>
                </div>

                <div className={styles.form_horizontal}>
                  <div className={styles.input_horizontal}>
                    <label htmlFor="professional_id">Tarjeta Profesional</label>
                    <input
                      className={styles.professional_id}
                      disabled={true}
                      required={false}
                      onChange={handleChange}
                      defaultValue={user.PROFESSIONAL_ID}
                      type="number"
                      name="professional_id"
                    />
                  </div>
                  <div className={styles.input_horizontal}>
                    <label htmlFor="gender">Genero</label>
                    <input
                      name="gender"
                      disabled={true}
                      value={
                        gender.find((element) => element.id === user.GENDER)
                          .name
                      }
                      type="text"
                    />
                  </div>
                </div>
                <label htmlFor="email">Correo Electronico</label>
                <input
                  name="email"
                  onChange={handleChange}
                  defaultValue={user.EMAIL}
                  disabled={isDisable}
                  required={true}
                  type="email"
                />

                {isDisable ? (
                  <></>
                ) : (
                  <div className={styles.form_horizontal}>
                    <div className={styles.input_horizontal}>
                      <label htmlFor="password">Contraseña</label>
                      <input
                        className={classPassword}
                        disabled={isDisable}
                        required={true}
                        onChange={handleChange}
                        type="password"
                        name="password"
                      />
                    </div>
                    <div className={styles.input_horizontal}>
                      <label htmlFor="validatePassword">
                        Confirmar contraseña
                      </label>
                      <input
                        className={classPassword}
                        disabled={isDisable}
                        required={true}
                        onChange={verifyPassword}
                        type="password"
                        defaultValue=""
                        name="validatePassword"
                      />
                    </div>
                  </div>
                )}
                {!isMatchPassword && (
                  <label className={styles.error_message}>{errorMessage}</label>
                )}

                <label htmlFor="rolShow">Roles Asignados</label>
                {roles.map((rol) => (
                  <>
                    <input
                      key={rol.id_rol}
                      name="rol"
                      defaultValue={rol.name_rol}
                      disabled={true}
                    />
                  </>
                ))}

                {dependencies.length == 0 ? (
                  <div className={styles.form_horizontal}>
                    <div className={styles.input_horizontal}>
                      <label className={styles.label_error}>
                        No tiene dependencias asignadas
                      </label>
                    </div>
                  </div>
                ) : (
                  <>
                    <label className={styles.label_dependencie} htmlFor="rol">
                      Dependencias Asignadas
                    </label>
                    <Table
                      headers={headersDependencies}
                      data={dependeciesToTable(dependencies)}
                    />
                  </>
                )}
                {!isReport && (
                  <div className={styles.form_horizontal}>
                    {isDisable ? (
                      <>
                        <input
                          className={styles.button_accept}
                          type="submit"
                          onClick={setDataUser}
                          value="Actualizar Datos"
                        />
                        <input
                          className={styles.button_cancel}
                          type="submit"
                          onClick={onClose}
                          value="Cerrar"
                        />
                      </>
                    ) : (
                      <>
                        <input
                          className={styles.button_accept}
                          type="submit"
                          value="Confirmar Cambios"
                        />

                        <input
                          className={styles.button_cancel}
                          type="submit"
                          onClick={cancelChanges}
                          value="Cancelar"
                        />
                      </>
                    )}
                  </div>
                )}
              </form>
            </>
          ) : (
            <Loading text="Cargando Datos de Usuario"></Loading>
          )}
        </div>
      )}
    </>
  );
}
