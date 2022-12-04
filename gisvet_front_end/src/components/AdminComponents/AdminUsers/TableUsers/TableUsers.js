//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes PrimeReact ====
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator, FilterService } from "primereact/api";

export default function TableUsers({ headers, data, actionItem }) {
  const dataHeaders = headers;
  const [dataReady, setDataReady] = useState(false);

  const [dataBody, setDataBody] = useState(data);

  useEffect(() => {
    setDataBody(data);
    if (actionItem != undefined) {
      setDataReady(true);
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
        Aplicar
      </Button>
    );
  };

  const typeDocumentTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={typeDocuments}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Tipo de documento"
        className="p-column-filter"
        showClear
      />
    );
  };

  const rolTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={roles}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Tipo de rol"
        className="p-column-filter"
        showClear
      />
    );
  };

  const filterHeader = (options) => {
    return <h3 className={styles.title_filters_dependencies}>Filtros</h3>;
  };

  let boton = document.getElementsByClassName("p-c");
  boton.innerText = "Texto";

  const statuses = ["Usuario", "Administrador", "Auditor"];
  const typeDocuments = [
    "Cedula de Ciudadanía",
    "Cedula de extranjería",
    "Tarjeta de Identidad",
    "Pasaporte",
  ];
  const roles = ["Administrador", "Usuario", "Auditor", "Rol no asignado"];

  const [globalFilter, setGlobalFilter] = useState(null);

  const header = (
    <div className={styles.table_header}>
      <h1 className={styles.title_header_ask}>Gestión de Usuarios</h1>
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

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  console.log("Listado de usuarios");
  console.log(dataBody);

  return (
    <div className={styles.table_data}>
      {dataReady ? (
        <DataTable
          header={header}
          globalFilter={globalFilter}
          className="myTable"
          headerClassName="header-table-style"
          rowClassName="row-accessories"
          paginator
          rows={6}
          value={dataBody}
          responsiveLayout="stack"
        >
          <Column
            showFilterMatchModes={false}
            showFilterMenuOptions={false}
            filterHeader={filterHeader}
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            filterElement={typeDocumentTemplate}
            field="tipoDoc"
            header="Tipo de documento"
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
            filterMatchMode="contains"
            field="document"
            header="Identificación"
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
            filterMatchMode="contains"
            field="name"
            header="Nombre"
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
            filterMatchMode="contains"
            field="professional_id"
            header="Tarjeta profesional"
            sortable
          ></Column>

          <Column
            showFilterMatchModes={false}
            showFilterMenuOptions={false}
            filterHeader={filterHeader}
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            filterElement={rolTemplate}
            header="Rol asignado"
            field="rol"
            filter
            sortable
            filterField="rol"
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
          rows={7}
          value={dataBody}
          responsiveLayout="stack"
        >
          <Column field="tipoDoc" header="Tipo de documento"></Column>
          <Column field="document" header="Identificación"></Column>
          <Column field="name" header="Nombre"></Column>
          <Column field="professional_id" header="Tarjeta profesional"></Column>
          <Column header="Rol asignado" field="rol"></Column>
        </DataTable>
      )}
    </div>
  );
}
