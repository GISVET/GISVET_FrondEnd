//=====Importaciones de React ====
import React, { useEffect, useState, useRef } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TablePatients/TablePatients";
import ShowPatient from "../ShowPatient/ShowPatient";

//=====Importaciones de componentes PrimeReact ====
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//=====Importaciones de hooks ====
import { useAdminPatients } from "hooks/AdminHooks/PatientsHooks/useAdminPatients";
import { useAdminOneUser } from "hooks/AdminHooks/UsersHooks/useAdminOneUser";

//=====Importaciones de imagenes ====
import icon_dependencie_settings from "./images/icon_show_dep.png";

export default function ShowPatientsReports({ onClose }) {
  const [report, setReport] = useState();
  const [user, setUser] = useState();
  const [usersRoles, setUserRoles] = useState();
  const { patients, headers } = useAdminPatients();
  const [idUser, setIdUser] = useState();
  const [namePatient, setNamePatient] = useState();

  const [noReport, setNoReport] = useState(true);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [secondData, setSecondData] = useState(false);
  const [textButtonUpdate, setTextButtonUpdate] = useState();
  const [childModal, setchildModal] = useState(<></>);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    id_clinic_history: "",
    name_patient: "",
  });
  const [chartData, setChart] = useState();
  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });
  const toast = useRef(null);

  const reportsSelect = [
    { label: "Datos de todas los pacientes", value: "UL" },
    { label: "Historia clinica de un paciente", value: "SU" },
  ];

  useEffect(() => {
    if (report == "UL" && patients != undefined) {
      setFirst(true);
      setSecond(false);
      setNoReport(false);
    } else if (report == "SU" && patients != undefined) {
      setFirst(false);
      setSecond(true);
      setNoReport(false);
    }
  }, [report, patients]);

  useEffect(() => {
    if (second == true && user != undefined) {
      setSecondData(true);
    }
  }, [user, second]);

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.addFont("Inter");
        doc.setFont("Inter");
        doc.setFontSize(20);
        doc.text(50, 10, "Reporte de los usuarios de la clinica");
        doc.autoTable(exportColumns, patients);
        doc.save("reporte_usuarios_clinica.pdf");
      });
    });
  };

  const cols = [
    { field: "tipoDoc", header: "Tipo de Documento" },
    { field: "document", header: "Identificación" },
    { field: "name", header: "Nombre" },
    { field: "professional_id", header: "Tarjeta Profesional" },
    { field: "rol", header: "Rol" },
  ];

  const handleChange = (event) => {
    console.log("Lo que capta el handle es ");
    console.log(event.target.value);
    let valueData = event.target.value;
    const patientData = JSON.parse(valueData);
    console.log("El patient es");
    console.log(patientData);
    setSecondData(false);
    setUser(patientData);
  };

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  return (
    <>
      {showModal ? (
        <>{childModal}</>
      ) : (
        <div className={styles.form_add_user_general}>
          <>
            <div className={styles.title_image}>
              <img src={icon_dependencie_settings} width="50" height="50" />
              <h1> Reportes de Pacientes </h1>
            </div>
            <form className={styles.form_add_user}>
              <label
                className={styles.label_table_users}
                htmlFor="id_clinic_history"
              >
                Seleccione el reporte a generar
              </label>
              <Dropdown
                value={report}
                options={reportsSelect}
                onChange={(e) => setReport(e.value)}
                placeholder="Selecione un reporte"
              />

              {first && (
                <>
                  <label className={styles.label_table_users}>
                    Reporte generado
                  </label>
                  <div className="flex align-items-center export-buttons"></div>
                  <Button
                    type="button"
                    icon="pi pi-file-pdf"
                    onClick={exportPdf}
                    className={styles.button_generate_pdf}
                    data-pr-tooltip="PDF"
                  >
                    Generar Pdf
                  </Button>
                  <Table
                    headers={headers}
                    data={patients}
                    isReport={true}
                  ></Table>
                </>
              )}
              {second && (
                <>
                  <label className={styles.label_table_users}>
                    Busqueda de productos aplicados
                  </label>
                  <label htmlFor="id_person">Seleccione el paciente </label>
                  <select
                    className={styles.document_type}
                    onChange={handleChange}
                    required={true}
                  >
                    <option disabled={true} selected></option>
                    {patients.map((user) => (
                      <option
                        key={user.id_clinic_history}
                        value={JSON.stringify(user)}
                      >
                        {user.id_clinic_history + " " + user.name_patient}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {secondData && <ShowPatient dataPatient={user} isReport={true} />}

              {noReport && (
                <h3 className={styles.no_selected_report}>
                  Aún no has seleccionado ningun reporte
                </h3>
              )}

              <div className={styles.form_horizontal}>
                <input
                  className={styles.button_accept}
                  type="submit"
                  onClick={onClose}
                  value="Salir de la vista de reportes"
                />
              </div>
            </form>
          </>
        </div>
      )}
    </>
  );
}
