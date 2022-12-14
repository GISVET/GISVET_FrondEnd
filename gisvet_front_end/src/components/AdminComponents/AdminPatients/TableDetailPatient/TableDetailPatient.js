//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes PrimeReact ====
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//=====Importaciones de constantes ====
import { measurement_units } from "constants/constants";

export default function TableDetailPatient({ headers, data, actionItem }) {
  const dataHeaders = headers;
  const [dataBody, setDataBody] = useState(data);

  console.log("Entrando al Tabledetail");
  useEffect(() => {
    setDataBody(data);
  }, [data]);

  const formatDate = (rowData) => {
    const time = new Date(rowData.DATE_PRODUCT_TRACING);
    time.setHours(time.getHours() + 5);
    return time.toLocaleString();
  };

  return (
    <div className={styles.table_data}>
      <DataTable 
          value={dataBody}
          paginator
          rows={6}>
        <Column
          dataType="date"
          body={formatDate}
          header="Fecha y Hora"
        ></Column>
        <Column field="DOCUMENT_PERSON" header="Id Médico"></Column>
        <Column field="FULL_NAME_PERSON" header="Nombre médico"></Column>
        <Column field="PRODUCT_NAME" header="Nombre producto"></Column>
        <Column field="UNIT_MEASUREMENT" header="Unidad de medida"></Column>
        <Column field="QUANTITY_USED" header="Cantidad usada"></Column>
        <Column field="DESTINY_SERVICE" header="Destino"></Column>
      </DataTable>
    </div>
  );
}
