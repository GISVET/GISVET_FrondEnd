import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import icon_see_detalle from "./images/Icon_ver_detalle.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

import "./table-style.css";

export default function TableDependencies({
  headers,
  data,
  actionItem,
  keyName,
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

  let boton = document.getElementsByClassName('p-c');
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


  const representativeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData.type_dependencie}</span>
      </React.Fragment>
    );
  };

  return (
    <div className={styles.table_data}>
      <DataTable
        className="myTable"
        headerClassName="header-table-style"
        rowClassName="row-accessories"
        paginator rows={10}
        value={dataBody}
        responsiveLayout="stack"
      >
        <Column
          field="id_dependencie"
          header="Id de la dependencia"
          filter
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="dependencie_name"
          header="Nombre de la dependencia"
          sortable
        ></Column>

        <Column
          showFilterMatchModes={false}
          showFilterMenuOptions={false}
          header="Tipo de Dependencia"
          body={representativeBodyTemplate}
          filter
          filterField="type_dependencie"
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
