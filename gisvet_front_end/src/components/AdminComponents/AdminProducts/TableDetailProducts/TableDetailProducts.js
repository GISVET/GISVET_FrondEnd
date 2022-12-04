import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

export default function TableDetailProducts({ headers, data, actionItem }) {
  const dataHeaders = headers;
  const [dataBody, setDataBody] = useState(data);

  useEffect(() => {
    setDataBody(data);
  }, [data]);

  const formatExpirationDate = (rowData) => {
    const time = new Date(rowData.EXPIRATION_DATE);
    time.setHours(time.getHours() + 5);
    return time.toLocaleString();
  };

  const formatManufacturingDate = (rowData) => {
    const time = new Date(rowData.MANUFACTURING_DATE);
    time.setHours(time.getHours() + 5);
    return time.toLocaleString();
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

  return (
    <div className={styles.table_data}>
      <DataTable
        className="table_products"
        rowClassName="row-accessories"
        paginator
        rows={7}
        value={dataBody}
        responsiveLayout="stack"
      >
        <Column
          showFilterOperator={false}
          showFilterMenu={true}
          showAddButton={false}
          field="ID_DEPENDENCIE"
          header="Id de la dependencia"
        ></Column>
        <Column
          showFilterOperator={false}
          showFilterMenu={true}
          showAddButton={false}
          filterMatchMode="contains"
          field="IUP"
          header="Id del Lote"
        ></Column>
        <Column
          showFilterMatchModes={false}
          showFilterMenuOptions={false}
          filterMatchMode="contains"
          body={formatManufacturingDate}
          header="Fecha de manufactura"
        ></Column>
        <Column
          showFilterMatchModes={false}
          showFilterMenuOptions={false}
          filterMatchMode="contains"
          body={formatExpirationDate}
          header="Fecha de vencimiento"
        ></Column>
        <Column
          showFilterMatchModes={false}
          showFilterMenuOptions={false}
          filterMatchMode="contains"
          field="NAME_BRAND"
          header="Marca "
        ></Column>
        <Column
          showFilterOperator={false}
          showFilterMenu={true}
          showAddButton={false}
          filterMatchMode="contains"
          field="INVIMA"
          header="Registro Sanitario"
        ></Column>

        <Column
          showFilterOperator={false}
          showFilterMenu={true}
          showAddButton={false}
          filterMatchMode="contains"
          field="QUANTITY"
          header="Cantidad"
        ></Column>
      </DataTable>
    </div>
  );
}
