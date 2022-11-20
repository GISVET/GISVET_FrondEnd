import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";


export default function TableUsers({
  headers,
  data,
  actionItem
}) {
  const dataHeaders = headers;
  const [dataBody, setDataBody] = useState(data);

  useEffect(() => {
    setDataBody(data);
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

  let boton = document.getElementsByClassName("p-c");
  boton.innerText = "Texto";

  const statuses = ["Usuario", "Administrador", "Auditor"];

  const [globalFilter, setGlobalFilter] = useState(null);


  const header = (
    <div className="table-header">
        <h1 className="title_header_ask">Gestión de Usuarios</h1>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText className="myask" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar ..." />
        </span>
    </div>
);

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
        placeholder="Tipo de rol"
        className="p-column-filter"
        showClear
      />
    );
  };

  const representativeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData.rol}</span>
      </React.Fragment>
    );
  };

  console.log("Listado de usuarios")
  console.log(dataBody)

  return (
    <div className={styles.table_data}>
      <DataTable
              header={header}
              globalFilter={globalFilter}
        className="myTable"
        headerClassName="header-table-style"
        rowClassName="row-accessories"
        paginator
        rows={9}
        value={dataBody}
        responsiveLayout="stack"
      >
        <Column
          field="tipoDoc"
          header="Tipo de documento"
          filter
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="document"
          header="Identificación"
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="name"
          header="Nombre"
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="professional_id"
          header="Tarjeta profesional"
          sortable
        ></Column>

        <Column
          showFilterMatchModes={false}
          showFilterMenuOptions={false}
          header="Rol asignado"
          body={representativeBodyTemplate}
          filter
          filterField="rol"
          filterElement={statusFilterTemplate}
          filterMenuStyle={{ width: "14rem" }}
        ></Column>

        <Column
          header="Ver detalles"
          body={actionDetails}
          exportable={false}
        ></Column>
      </DataTable>
    </div>
  );
}
