//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes PrimeReact ====
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";

//=====Importaciones de imagenes ====
import icon_see_detalle from "./images/Icon_ver_detalle.png";

export default function TableDependencies({
  headers,
  data,
  actionItem,
  isReport,
}) {
  const [dataBody, setDataBody] = useState(data);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [isReportData, setisReportData] = useState(true);

  const matchModes = [
    { label: "Al inicio", value: FilterMatchMode.STARTS_WITH },
    { label: "Contiene", value: FilterMatchMode.CONTAINS },
    { label: "No contiene", value: FilterMatchMode.NOT_CONTAINS },
    { label: "Al final", value: FilterMatchMode.ENDS_WITH },
    { label: "Es igual a ", value: FilterMatchMode.EQUALS },
    { label: "No es igual a", value: FilterMatchMode.NOT_EQUALS },
  ];

  const header = (
    <div className={styles.table_header}>
      <h1 className={styles.title_header_ask}>Gestión de Dependencias</h1>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          className={styles.myask}
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar ..."
        />
      </span>
    </div>
  );

  useEffect(() => {
    setDataBody(data);
    if (isReport != undefined) {
      setisReportData(false);
    }
  }, [data]);

  const actionDetails = (rowData) => {
    return (
      <Button
        icon="pi pi-arrow-right"
        className="p-button-rounded p-button-details"
        onClick={() => actionItem(rowData.id_dependencie)}
      />
    );
  };

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        className={styles.button_clear}
      >
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

  let boton = document.getElementsByClassName("p-c");
  boton.innerText = "Texto";

  const statuses = ["Bodega", "Farmacia", "Consultorio"];

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };
  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Tipo de dependencia"
        className="p-column-filter"
        showClear
      />
    );
  };

  return (
    <div className={styles.table_data}>
      {isReportData ? (
        <DataTable
          header={header}
          globalFilter={globalFilter}
          className="myTable"
          rowClassName="row-accessories"
          paginator
          rows={8}
          value={dataBody}
          responsiveLayout="stack"
        >
          <Column
            filterHeader={filterHeader}
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            showFilterOperator={false}
            showFilterMenu={true}
            showAddButton={false}
            filterMatchModeOptions={matchModes}
            field="id_dependencie"
            header="Id de la dependencia"
            filterDisplay="menu"
            filter
            sortable
          ></Column>
          <Column
            filterHeader={filterHeader}
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            showFilterOperator={false}
            showFilterMenu={true}
            showAddButton={false}
            filterMatchModeOptions={matchModes}
            filter
            filterMenuClassName="my_filters_name"
            filterHeaderClassName="my_header_filter"
            filterDisplay="row"
            field="dependencie_name"
            header="Nombre de la dependencia"
            sortable
          ></Column>

          <Column
            showFilterMatchModes={false}
            showFilterMenuOptions={false}
            filterHeader={filterHeader}
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            filterElement={statusFilterTemplate}
            header="Tipo de Dependencia"
            field="type_dependencie"
            filter
            sortable
            filterField="type_dependencie"
          ></Column>

          <Column
            header="Ver detalles"
            body={actionDetails}
            exportable={false}
          ></Column>
        </DataTable>
      ) : (
        <DataTable
          globalFilter={globalFilter}
          className="myTable"
          headerClassName="header-table-style"
          rowClassName="row-accessories"
          paginator
          rows={8}
          value={dataBody}
          responsiveLayout="stack"
        >
          <Column field="id_dependencie" header="Id de la dependencia"></Column>
          <Column
            field="dependencie_name"
            header="Nombre de la dependencia"
          ></Column>
          <Column
            header="Tipo de Dependencia"
            field="type_dependencie"
          ></Column>
        </DataTable>
      )}
    </div>
  );
}
