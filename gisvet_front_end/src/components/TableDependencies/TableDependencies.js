import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import icon_see_detalle from "./images/Icon_ver_detalle.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator, FilterService } from "primereact/api";

export default function TableDependencies({
  headers,
  data,
  actionItem,
  keyName,
}) {
  const dataHeaders = headers;
  const [dataBody, setDataBody] = useState(data);
  const [globalFilter, setGlobalFilter] = useState(null);

  const matchModes = [
    {label: 'Al inicio', value:FilterMatchMode.STARTS_WITH},
    {label: 'Contiene', value:FilterMatchMode.CONTAINS},
    {label: 'No contiene', value:FilterMatchMode.NOT_CONTAINS},
    {label: 'Al final', value:FilterMatchMode.ENDS_WITH},
    {label: 'Es igual a ', value:FilterMatchMode.EQUALS},
    {label: 'No es igual a', value:FilterMatchMode.NOT_EQUALS}
];

const generalModes = [
  {label: 'Todos los ', value:FilterOperator.AND},
  {label: 'Solo el primero', value:FilterOperator.OR}
];

const filterFooterTemplate = () => {
  return <div className="px-3 pt-0 pb-3 text-center font-bold">Customized Buttons</div>;
}


  const header = (
    <div className="table-header">
        <h1 className={styles.title_header_ask}>Gestión de Dependencias</h1>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText className="myask" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar ..." />
        </span>
    </div>
);

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

  const filterClearTemplate = (options) => {
    return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"> Limpiar</Button>;
}

const filterApplyTemplate = (options) => {
    return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"> Aplicar</Button>
}

const filterHeader = (options) => {
  return <h3 className={styles.title_filters_dependencies}>Filtros</h3>
}

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
        header={header}
        globalFilter={globalFilter}
        className="myTable"
        headerClassName="header-table-style"
        rowClassName="row-accessories"
        paginator rows={8}
        value={dataBody}
        responsiveLayout="stack"
      >
        <Column
          field="id_dependencie"
          header="Id de la dependencia"
          filterMatchModeOptions={matchModes}
          filterDisplay="menu"
          filter
          sortable
        ></Column>
        <Column
          filter
          filterMenuClassName="my_filters_name"
          filterMatchModeOptions={matchModes}
          filterClear={filterClearTemplate} 
          filterApply={filterApplyTemplate}
          filterHeaderClassName = "my_header_filter"
          showFilterOperator = {false}
          showFilterMenu = {true}
          filterHeader = {filterHeader}
          showAddButton = {false}
          filterDisplay="row"
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
