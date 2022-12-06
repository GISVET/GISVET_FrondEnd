//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes PrimeReact ====
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

export default function TableAuditorGeneral({
  headers,
  data,
  actionItem,
  isReport,
}) {
  const [dataBody, setDataBody] = useState(data);

  useEffect(() => {
    setDataBody(data);
    if (isReport != undefined) {
      setisReportData(false);
    }
  }, [data]);

  const [globalFilter, setGlobalFilter] = useState(null);
  const [isReportData, setisReportData] = useState(true);

  const header = (
    <div className={styles.table_header}>
      <h1 className={styles.title_header_ask}>Tabla de Auditoria</h1>
    </div>
  );

  const matchModes = [
    { label: "Al inicio", value: FilterMatchMode.STARTS_WITH },
    { label: "Contiene", value: FilterMatchMode.CONTAINS },
    { label: "No contiene", value: FilterMatchMode.NOT_CONTAINS },
    { label: "Al final", value: FilterMatchMode.ENDS_WITH },
    { label: "Es igual a ", value: FilterMatchMode.EQUALS },
    { label: "No es igual a", value: FilterMatchMode.NOT_EQUALS },
  ];

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        className={styles.button_clear}
      >
        {" "}
        Limpiar
      </Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        className={styles.apply_filter}
      >
        {" "}
        Aplicar
      </Button>
    );
  };

  const filterHeader = (options) => {
    return <h3 className={styles.title_filters_dependencies}>Filtros</h3>;
  };
  const actionDetails = (rowData) => {
    return (
      <Button
        icon="pi pi-arrow-right"
        className="p-button-rounded p-button-details"
        onClick={() => actionItem(rowData)}
      />
    );
  };

  let boton = document.getElementsByClassName("p-c");
  boton.innerText = "Texto";

  const formatDate = (rowData) => {
    const time = new Date(rowData.DATE_CREATE);
    time.setHours(time.getHours() + 5);
    return time.toLocaleString();
  };

  return (
    <div className={styles.table_data}>
      <DataTable
        header={header}
        globalFilter={globalFilter}
        className="myTable"
        rowClassName="row-accessories"
        paginator
        rows={5}
        value={dataBody}
        responsiveLayout="stack"
      >
        <Column
          dataType="date"
          body={formatDate}
          header="Fecha de la operación"
        ></Column>
        <Column
          field="DESCRIPTION_HISTORY_USER"
          header="Descripción de la operación"
        ></Column>
      </DataTable>
    </div>
  );
}
