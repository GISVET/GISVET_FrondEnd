//=====Importaciones de React====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales====
import Table from "components/AuditorComponents/AuditorTableGeneral/TableAuditorGeneral/TableAuditorGeneral";

//=====Importaciones de hooks ====
import { useAuditorTableGeneral } from "hooks/AuditorHooks/GeneralHooks/useAuditorTableGeneral";

export default function AuditorTableGeneral() {
  const { patients, headers } = useAuditorTableGeneral();
  return (
    <>
      <div className={styles.general_users}>
        <Table
          headers={headers}
          data={patients}
          keyName={"ID_HISTORY"}
        />
      </div>
    </>
  );
}
