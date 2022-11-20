import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import "./table-style.css";

export default function TableProducts({ headers, data, actionItem }) {
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

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  console.log("Listado de Pacientes");
  console.log(dataBody);

  return (
    <div className={styles.table_data}>
      <DataTable
        className="table_products"
        rowClassName="row-accessories"
        paginator
        rows={9}
        value={dataBody}
        responsiveLayout="stack"
      >
        <Column
          field="id_product"
          header="Id producto"
          filter
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="product_name"
          header="Nombre"
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="presentation"
          header="Presentación"
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="measurement_units"
          header="Medida"
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="type_product"
          header="Tipo"
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="quantity"
          header="Cantidad"
          sortable
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
