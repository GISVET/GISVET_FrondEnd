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
import { Fieldset } from 'primereact/fieldset';

//=====Importaciones de hooks ====
import useUser from "hooks/UserHooks/useUser";
import { Modal } from "components/GeneralComponents/Modal";
import Loading from "components/GeneralComponents/Loading";
import MessageConfirm from "components/GeneralComponents/MessageConfirm";

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
  const [editingRows, setEditingRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [childModal, setchildModal] = useState(<></>);
  const {dependencieActive} = useUser();
  const [expandedRows, setExpandedRows] = useState(null);

  useEffect(() => {
    setDataBody(data);
  }, [data]);

  


  const actionDetails = (rowData) => {
    
    return (
      <Button
        icon="pi pi-arrow-right"
        className="p-button-rounded p-button-details"
        onClick={() => setExpandedRows(rowData)}
      />
    );
  };

  const formatFabDate = (rowData) => {
    const time = new Date(rowData.MANUFACTURING_DATE);
    time.setHours(time.getHours() + 5);
    return time.toLocaleString();
  };

  const formatExpDate = (rowData) => {
    const time = new Date(rowData.EXPIRATION_DATE);
    time.setHours(time.getHours() + 5);
    return time.toLocaleString();
  };


  const rowExpansionTemplate = (data) => {
    return (
      <Fieldset legend={"Detalles de "+data.PRODUCT_NAME}>
        <div class="grid">
          <div class="col">
            <h6>Registro sanitario</h6>
            <p>{data.INVIMA}</p>
          </div>
          <div class="col">
            <h5>Precio Unitario</h5>
            <p>{amountBodyTemplate(data)}</p>
          </div>
          <div class="col">
            <h5>Tipo de producto</h5>
            <p>{TypeItemTemplate(data)}</p>
          </div>
          <div class="col">
            <h5>Unidad de medida</h5>
            <p>{MeasureItemTemplate(data)}</p>
          </div>
          <div class="col">
            <h5>Fecha de Fabricaci??n</h5>
            <p>{formatFabDate(data)}</p>
          </div>
          <div class="col">
            <h5>Fecha de expiraci??n</h5>
            <p>{formatExpDate(data)}</p>
          </div>
      </div>
      </Fieldset>
    );
}

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
    setShowModal(true);
    dataToSend["dataProducts"] = seletedProducts;
    setchildModal(<Loading text={"Enviando productos"}></Loading>)
    const res = await actionSendProducts(dataToSend);
    if (res.status === 200) {
      setEditingRows([]);
      setSelectedProducts([]);
    }
    setchildModal(
      <MessageConfirm
        onClose={handleCloseModal}
        isCorrect={res.status == 200 ? true : false}
        message={res.message}
      />
    );
    
  };

  const setActiveRowIndex = (index, isActive) => {
    let _editingRows = {
      ...editingRows,
      ...{ [`${dataBody[index].ID_ITEM}`]: isActive },
    };
    setEditingRows(_editingRows);
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const changeSelectedOneProducts = (e, index) => {
    let {name,value} = e.target;
    const newData = seletedProducts.slice();
    newData[index][name] = value;
    setSelectedProducts(newData);
    e.originalEvent.preventDefault();
  };

  const onQuantityEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    if (isPositiveInteger(newValue)) rowData[field] = newValue;
    else event.preventDefault();
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  }

  const amountBodyTemplate = (rowData) => {
      return formatCurrency(rowData.PRICE_PER_UNIT);
  }

  const cellEditor = (options) => {
    const maxValue = options.value;
    if (seletedProducts.some(
            (element) => element.ID_ITEM === options.rowData.ID_ITEM
          )
        ) {
          let indexSelectedProduct = seletedProducts.findIndex(
            (item) => item.ID_ITEM === options.rowData.ID_ITEM
          );
          return (
            <InputNumber
              value={options.value}
              name="QUANTITY"
              onValueChange={(e) => changeSelectedOneProducts(e, indexSelectedProduct)}
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

  //valida los productos aptos para seleccionar
  const isSelectable = (row) => {
    let isSelectable = (row.QUANTITY > 0 && !(row.DATE_EXPIRATION.startsWith("Producto vencido")))
    return isSelectable;
  }

//Permite Validar que productos son seleccionables
  const isRowSelectable = (event) => {
    const data = event.data;
    return isSelectable(data);
  }

//Activa los estilos de celda desactivada a los productos que no se pueden seleccionar
  const rowClassName = (data) => {
    return isSelectable(data) ? '' : 'p-disabled';
  }

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
        Gesti??n de {dependencieActive.DEPENDECIE_NAME}
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

  const allowExpansion = (rowData) => {
    return rowData.QUANTITY > 0;
  };

  return (
    <div className={styles.table_data}>
      <DataTable
        className="table_products"
        header={header}
        globalFilter={globalFilter}
        paginator
        rows={9}
        value={dataBody.filter(item =>item.QUANTITY >0)}
        responsiveLayout="stack"
        selectionMode="checkbox"
        selection={sendProducts ? seletedProducts : null}
        onSelectionChange={selectionChange}
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
        expandedRows={expandedRows}
        rowExpansionTemplate={rowExpansionTemplate}
        selectOnEdit={false}
        isDataSelectable={sendProducts && isRowSelectable}
        rowClassName={sendProducts && rowClassName}
        editMode="row"
        editingRows={sendProducts && editingRows}
        onRowEditChange={onRowEditChange}
        onRowToggle={!sendProducts? (e) => setExpandedRows(e.data) :null}
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
          header="Presentaci??n"
          body={presentationItemTemplate}
          sortable
        ></Column>
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
          header="Tiempo Expiraci??n"
          sortable
        ></Column>

        {!sendProducts && (
          <Column
            header="Ver detalles"
            // body={actionDetails}
            expander={allowExpansion}
            style={{ width: '3em' }}
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
