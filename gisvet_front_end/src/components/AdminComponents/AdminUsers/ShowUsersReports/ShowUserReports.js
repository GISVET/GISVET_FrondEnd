//=====Importaciones de React ====
import React, { useEffect, useState, useRef } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableUsers/TableUsers";

//=====Importaciones de componentes PrimeReact ====
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//=====Importaciones de hooks ====
import { useUsersAdmin } from "hooks/AdminHooks/UsersHooks/useAdminUsers";

//=====Importaciones de imagenes ====
import icon_dependencie_settings from "./images/icon_show_dep.png";

export default function ShowUserReports({ dataPatient, onClose }) {
  const [report, setReport] = useState("");

  const [usersRoles, setUserRoles] = useState();

  const { users, listUserToTable, headers } = useUsersAdmin();

  const [noReport, setNoReport] = useState(true);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

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

  function usersByRol() {
    let dataFormated = [];

    let general = 0;
    let auditors = 0;
    let admins = 0;

    for (let i = 0; i < listUserToTable.length; i++) {
      if (listUserToTable[i].rol === "Administrador") {
        admins++;
      } else if (listUserToTable[i].rol === "Usuario") {
        general++;
      } else if (listUserToTable[i].rol === "Auditor") {
        auditors++;
      }
    }

    let personData = {
      admins: admins,
      users: general,
      auditors: auditors,
    };

    dataFormated.push(personData);

    setChart({
      labels: [
        "Cantidad de Administradores",
        "Cantidad de Usuarios",
        "Cantidad de Auditores",
      ],
      datasets: [
        {
          data: [admins, general, auditors],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
        },
      ],
    });

    setUserRoles(dataFormated);
    return dataFormated;
  }

  const reportsSelect = [
    { label: "Datos de todos los usuarios", value: "UL" },
    { label: "Cantidad de usuarios por rol", value: "CR" },
    { label: "Datos de usuario especifico", value: "SU" },
  ];

  useEffect(() => {
    console.log("El dato de report es  :");
    console.log(report);
    if (report == "UL" && users != undefined) {
      setFirst(true);
      setSecond(false);
      setThird(false);
      setNoReport(false);
    } else if (report == "CR" && users != undefined) {
      console.log("Entra a reporte CR");
      usersByRol();
      setFirst(false);
      setSecond(true);
      setThird(false);

      setNoReport(false);
      console.log("Los usuarios por rol ");
      console.log(usersRoles);
    } else if (report == "SU" && users != undefined) {
      setFirst(false);
      setSecond(false);
      setThird(true);
      setNoReport(false);
    }
  }, [report, users]);

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.addFont("Inter");
        doc.setFont("Inter");
        doc.setFontSize(20);
        doc.text(50, 10, "Reporte de los usuarios de la clinica");
        doc.autoTable(exportColumns, listUserToTable);
        doc.save("reporte_usuarios_clinica.pdf");
      });
    });
  };

  console.log("Los datos de user que llegan son ");
  console.log(listUserToTable);
  const cols = [
    { field: "tipoDoc", header: "Tipo de Documento" },
    { field: "document", header: "Identificación" },
    { field: "name", header: "Nombre" },
    { field: "professional_id", header: "Tarjeta Profesional" },
    { field: "rol", header: "Rol" },
  ];

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
              <h1> Reportes de Usuarios </h1>
            </div>
            <form className={styles.form_add_user} onSubmit={""}>
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
                  <Table headers={headers} data={listUserToTable}></Table>
                </>
              )}
              {second && (
                <>
                  <label className={styles.label_table_users}>
                    Reporte generado - Usuarios por rol
                  </label>
                  <div className={styles.table_data}>
                    <DataTable
                      className="myTable"
                      headerClassName="header-table-style"
                      rowClassName="row-accessories"
                      value={usersRoles}
                    >
                      <Column
                        field="admins"
                        header="Total de Administradores"
                      ></Column>
                      <Column
                        field="auditors"
                        header="Total de Auditores"
                      ></Column>
                      <Column field="users" header="Total de Usuarios"></Column>
                    </DataTable>
                  </div>
                  <label className={styles.label_table_users}>
                    Grafico generado - Usuarios por rol
                  </label>
                  <Chart
                    className={styles.graphic}
                    type="pie"
                    data={chartData}
                    options={lightOptions}
                    style={{ position: "relative", width: "40%" }}
                  />
                </>
              )}
              {third && (
                <>
                  <label className={styles.label_table_users}>
                    Busqueda de usuario especifico
                  </label>
                  <div className={styles.table_data}>
                    <DataTable
                      className="myTable"
                      headerClassName="header-table-style"
                      rowClassName="row-accessories"
                      value={usersRoles}
                    >
                      <Column
                        field="admins"
                        header="Total de Administradores"
                      ></Column>
                      <Column
                        field="auditors"
                        header="Total de Auditores"
                      ></Column>
                      <Column field="users" header="Total de Usuarios"></Column>
                    </DataTable>
                  </div>
                  <label className={styles.label_table_users}>
                    Grafico generado - Usuarios por rol
                  </label>
                  <Chart
                    className={styles.graphic}
                    type="pie"
                    data={chartData}
                    options={lightOptions}
                    style={{ position: "relative", width: "40%" }}
                  />
                </>
              )}

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
