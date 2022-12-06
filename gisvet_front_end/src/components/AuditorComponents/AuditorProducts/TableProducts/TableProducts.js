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
import { FilterMatchMode } from "primereact/api";

export default function TableProducts({ headers, data, actionItem, isReport }) {
  const dataHeaders = headers;
  const [dataBody, setDataBody] = useState(data);

  const [isReportData, setisReportData] = useState(true);

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
        onClick={() => actionItem(rowData)}
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

  const typeProduct = [
    "Laboratorio",
    "Elementos de Aseo",
    "Elementos Hospitalarios",
    "Elementos Generales",
    "Medicamentos Generales",
    "Médico - Quirurjicos",
  ];
  const presentationsProduct = [
    "Unidad",
    "Caja",
    "Paquete",
    "Ampolla",
    "Frasco",
  ];
  const unitMeasurementProduct = [
    "Unidad",
    "Mililitros",
    "Libra",
    "Kilogramo",
    "Gramos",
    "Galón",
  ];

  const typeProductTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={typeProduct}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Tipo de producto"
        className="p-column-filter"
        showClear
      />
    );
  };

  const presentationProductTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={presentationsProduct}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Presentación del producto"
        className="p-column-filter"
        showClear
      />
    );
  };

  const unitMeasurementProductTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={unitMeasurementProduct}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Unidad de medida del producto"
        className="p-column-filter"
        showClear
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

  const [globalFilter, setGlobalFilter] = useState(null);

  const header = (
    <div className={styles.table_header}>
      <h1 className={styles.title_header_ask}>Gestión de Productos</h1>
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

  let boton = document.getElementsByClassName("p-c");
  boton.innerText = "Texto";

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  return (
    <div className={styles.table_data}>
      {isReportData ? (
        <DataTable
          className="table_products"
          header={header}
          globalFilter={globalFilter}
          rowClassName="row-accessories"
          paginator
          rows={7}
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
            field="id_product"
            header="Id producto"
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
            field="product_name"
            header="Nombre"
            sortable
          ></Column>
          <Column
            showFilterMatchModes={false}
            showFilterMenuOptions={false}
            filterHeader={filterHeader}
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            filterElement={presentationProductTemplate}
            filter
            filterMatchMode="contains"
            field="presentation"
            header="Presentación"
            sortable
          ></Column>
          <Column
            showFilterMatchModes={false}
            showFilterMenuOptions={false}
            filterHeader={filterHeader}
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            filterElement={unitMeasurementProductTemplate}
            filter
            filterMatchMode="contains"
            field="measurement_units"
            header="Medida"
            sortable
          ></Column>
          <Column
            showFilterMatchModes={false}
            showFilterMenuOptions={false}
            filterHeader={filterHeader}
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            filterElement={typeProductTemplate}
            filter
            filterMatchMode="contains"
            field="type_product"
            header="Tipo"
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
      ) : (
        <DataTable
          className="table_products"
          globalFilter={globalFilter}
          rowClassName="row-accessories"
          paginator
          rows={7}
          value={dataBody}
          responsiveLayout="stack"
        >
          <Column field="id_product" header="Id producto"></Column>
          <Column field="product_name" header="Nombre"></Column>
          <Column field="presentation" header="Presentación"></Column>
          <Column field="measurement_units" header="Medida"></Column>
          <Column field="type_product" header="Tipo"></Column>
          <Column field="quantity" header="Cantidad"></Column>
        </DataTable>
      )}
    </div>
  );
}
