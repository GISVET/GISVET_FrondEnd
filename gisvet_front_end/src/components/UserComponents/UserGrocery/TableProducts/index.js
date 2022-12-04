//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes de PrimeReact ====
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

//=====Importaciones de hooks ====
import useUser from "hooks/UserHooks/useUser";

//=====Importaciones de constantes ====
import {presentations, measurement_units, type_product } from "constants/constants"


export default function TableProducts({ headers, data, actionItem }) {
  const dataHeaders = headers;
  const [dataBody, setDataBody] = useState(data);
  const {logout, 
    islogged,
    role,
    dependencies,
    rolesUser,
    changeRol,
    changeDependencie,
    dependencieActive, 
    errorMessage} = useUser()

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

  const [globalFilter, setGlobalFilter] = useState(null);


  const header = (
    <div className="table-header">
        <h1 className="title_header_ask">Gestión de {dependencieActive.DEPENDECIE_NAME}</h1>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText className="myask" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar ..." />
        </span>
    </div>
);

  let boton = document.getElementsByClassName("p-c");
  boton.innerText = "Texto";


  const presentationItemTemplate = (rowdata) => {
    return (presentations.find(item => item.id === rowdata.PRESENTATION)).name;
  };
  const MeasureItemTemplate = (rowdata) => {
    return (measurement_units.find(item => item.id === rowdata.MEASUREMENT_UNITS)).name;
  };
  const TypeItemTemplate = (rowdata) => {
    return (type_product.find(item => item.id === rowdata.TYPE_PRODUCT)).name;
  };



  console.log("Listado de Pacientes");
  console.log(dataBody);

  return (
    <div className={styles.table_data}>
      <DataTable
        className="table_products"
        header={header}
        globalFilter={globalFilter}
        rowClassName="row-accessories"
        paginator
        rows={9}
        value={dataBody}
        responsiveLayout="stack"
      >
        <Column
          field="IUP"
          header="Identificador producto"
          filter
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="PRODUCT_NAME"
          header="Nombre"
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="PRESENTATION"
          header="Presentación"
          body={presentationItemTemplate}
          sortable
        ></Column>
        {/*<Column
          filter
          filterMatchMode="contains"
          field="MEASUREMENT_UNITS"
          header="Medida"
          body={MeasureItemTemplate}
          sortable
  ></Column>*/}
        <Column
          filter
          filterMatchMode="contains"
          field="TYPE_PRODUCT"
          header="Tipo"
          body={TypeItemTemplate}
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="QUANTITY"
          header="Cantidad"
          
          sortable
        ></Column>

        <Column
          filter
          filterMatchMode="contains"
          field="DATE_EXPIRATION"
          header="Tiempo Expiración"
          sortable
        ></Column>

        {/*<Column
          header="Ver detalles"
          body={actionDetails}
          exportable={false}
        ></Column>*/}
      </DataTable>
    </div>
  );
}
