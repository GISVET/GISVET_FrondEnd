//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes de PrimeReact ====
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

//=====Importaciones de hooks ====
import useUser from "hooks/UserHooks/useUser";
import { Modal } from "components/GeneralComponents/Modal";

//=====Importaciones de constantes ====
import {presentations, measurement_units, type_product } from "constants/constants"
import ValidateDataSendProducts from "components/UserComponents/ValidateDataSendProducts";

export default function TableProducts({
  actionSendProducts,
  sendProducts,
  data,
  actionItem,
}) {
  const [dataBody, setDataBody] = useState(data);
  const [seletedProducts, setSelectedProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [editingRows, setEditingRows] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<></>);
  const {dependencieActive} = useUser();

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

  const ShowConfirmSend = () => {
    setShowModal(true);
    setchildModal(
      <ValidateDataSendProducts
        onClose={handleCloseModal}
        onSubmit={getDataToSendProducts}
      />
    );
  };

  const getDataToSendProducts = async(dataToSend) => {
    dataToSend["dataProducts"] = seletedProducts;
    const res = await actionSendProducts(dataToSend);
    if (res === 200) {
      setEditingRows(null);
      setSelectedProducts(null);
    }
  };

  const setActiveRowIndex = (index, isActive) => {
    console.log(dataBody[index])
    let _editingRows = {
      ...editingRows,
      ...{ [`${dataBody[index].ID_ITEM}`]: isActive },
    };
    setEditingRows(_editingRows);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const changeSelectedOneProducts = (e, data) => {
    let valueaux = e.value;
    console.log(data)
    const index = seletedProducts.findIndex(
      (item) => item.ID_ITEM === data.rowData.ID_ITEM
    );
    const newData = seletedProducts.slice();
    newData[index][data.field] = valueaux;
    setSelectedProducts(newData);
    e.originalEvent.preventDefault();
  };

  const onQuantityEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    if (isPositiveInteger(newValue)) rowData[field] = newValue;
    else event.preventDefault();
  };

  const cellEditor = (options) => {
    const maxValue = options.value;
    if (
      seletedProducts.some(
        (element) => element.ID_ITEM === options.rowData.ID_ITEM
      )
    ) {
      return (
        <InputNumber
          value={options.value}
          onValueChange={(e) => changeSelectedOneProducts(e, options)}
          showButtons
          buttonLayout="horizontal"
          min={1}
          max={maxValue}
        />
      );
    } else {
      return options.value;
    }
  };

  const isPositiveInteger = (val) => {
    let str = String(val);
    str = str.trim();
    if (!str) {
      return false;
    }
    str = str.replace(/^0+/, "") || "0";
    let n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  };

  const selectionChange = (e) => {
    setSelectedProducts(e.value);
  };

  const onRowEditChange = (e) => {
    setEditingRows(e.data);
  };

  const onRowSelect = (event) => {
    const isSelected = (item) => item.ID_ITEM === event.data.ID_ITEM;
    const index = dataBody.findIndex(isSelected);
    setActiveRowIndex(index, true);
  };

  const onRowUnselect = (event) => {
    const isSelected = (item) => item.ID_ITEM === event.data.ID_ITEM;
    const index = dataBody.findIndex(isSelected);
    setActiveRowIndex(index, false);
  };

  const header = (
    <div className={styles.table_header}>
      <h1 className={styles.title_header_ask}>
        Gestión de {dependencieActive.DEPENDECIE_NAME}
      </h1>
      <div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className={styles.myask}
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar ..."
          />
        </span>
        {sendProducts && (
          <Button
            label="Enviar Productos"
            icon="pi pi-upload"
            className="p-button-success mr-2"
            onClick={ShowConfirmSend}
          />
        )}
      </div>
    </div>
  );

  let boton = document.getElementsByClassName("p-c");
  boton.innerText = "Texto";

  const presentationItemTemplate = (rowdata) => {
    return presentations.find((item) => item.id === rowdata.PRESENTATION).name;
  };
  const MeasureItemTemplate = (rowdata) => {
    return measurement_units.find(
      (item) => item.id === rowdata.MEASUREMENT_UNITS
    ).name;
  };
  const TypeItemTemplate = (rowdata) => {
    return type_product.find((item) => item.id === rowdata.TYPE_PRODUCT).name;
  };

  return (
    <div className={styles.table_data}>
      <DataTable
        className="table_products"
        header={header}
        globalFilter={globalFilter}
        paginator
        rows={9}
        value={dataBody}
        responsiveLayout="stack"
        selectionMode="checkbox"
        selection={sendProducts ? seletedProducts : null}
        onSelectionChange={selectionChange}
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
        selectOnEdit={false}
        editMode="row"
        editingRows={sendProducts ? editingRows : null}
        onRowEditChange={onRowEditChange}
        dataKey="ID_ITEM"
      >
        {sendProducts && (
          <Column selectionMode="multiple" exportable={false}></Column>
        )}
        <Column
          field="IUP"
          header="Identificador producto"
          filter
          filterMatchMode="contains"
          sortable
          showClearButton
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
          field="NAME_BRAND"
          header="Marca"
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="QUANTITY"
          header="Cantidad"
          cellEditValidatorEvent="blur"
          editor={(options) => cellEditor(options)}
          sortable
        ></Column>
        <Column
          filter
          filterMatchMode="contains"
          field="DATE_EXPIRATION"
          header="Tiempo Expiración"
          sortable
        ></Column>

        {!sendProducts && (
          <Column
            header="Ver detalles"
            body={actionDetails}
            exportable={false}
          ></Column>
        )}
      </DataTable>
      {showModal && 
        <Modal
          onClose={handleCloseModal}
          >
          {childModal}
        </Modal>
      }
    </div>
  );
}
