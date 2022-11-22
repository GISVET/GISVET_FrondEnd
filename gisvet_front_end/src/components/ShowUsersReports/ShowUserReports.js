import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";
import icon_dependencie_settings from "./images/icon_show_dep.png";
import { useRolesList } from "hooks/useRoles";
import { Button } from "primereact/button";

import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import { typeDependencies, gender, role } from "constants/constants";
import Table from "components/TableUsers/TableUsers";
import { useAdminOnePatient } from "hooks/useAdminOnePatient";
import { useUsersAdmin } from "hooks/useAdminUsers";
import { patientshistory } from "constants/headersTables";
import MessageConfirm from "components/MessageConfirm";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

export default function ShowUserReports({ dataPatient, onClose }) {
  const [report, setReport] = useState("");

  const {
    loading,
    users,
    listUserToTable,
    findUserByName,
    orderUsers,
    headers,
  } = useUsersAdmin();

  const [dataReady, setDataReady] = useState(false);

  const [isDisable, setDisable] = useState(true);
  const [textButtonUpdate, setTextButtonUpdate] = useState();
  const [childModal, setchildModal] = useState(<></>);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    id_clinic_history: "",
    name_patient: "",
  });

  const toast = useRef(null);

  const reportsSelect = [
    { label: "Listado de Usuarios", value: "UL" },  ];

  useEffect(() => {
    if (report == "UL" && users != undefined) {
      console.log("Entra al reporte de listado de usuarios");
      setDataReady(true);
    } else if (report == "UD") {
      console.log("Entra al reporte de usuarios por dependencias");
      setDataReady(true);
    }
  }, [report, users]);

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.addFont("Inter")
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
              <label htmlFor="id_clinic_history">
                Seleccione el reporte a generar
              </label>
              <Dropdown
                value={report}
                options={reportsSelect}
                onChange={(e) => setReport(e.value)}
                placeholder="Selecione un reporte"
              />

              {dataReady ? (
                <>
                  <label className={styles.label_table_users}>
                    Reporte generado
                  </label>
                  <div className="flex align-items-center export-buttons">


                  </div>
                  <Button
                      type="button"
                      icon="pi pi-file-pdf"
                      onClick={exportPdf}
                      className={styles.button_generate_pdf}
                      data-pr-tooltip="PDF"
                    >Generar Pdf </Button>
                  <Table headers={headers} data={listUserToTable}></Table>

                </>
              ) : (
                <h3 className={styles.no_selected_report}>Aún no has seleccionado ningun reporte</h3>
              )}

              <div className={styles.form_horizontal}>
                <input
                  className={styles.button_accept}
                  type="submit"
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
