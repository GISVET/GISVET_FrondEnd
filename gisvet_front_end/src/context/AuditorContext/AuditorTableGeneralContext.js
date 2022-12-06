//=====Importaciones de React ====
import React, { useContext, useEffect, useState } from "react";

//=====Importaciones de contextos ====
import UserContext from "../UserContext/UserContext";

//=====Importaciones de servicios ====
import getAuditorTable from "services/AuditorServices/GeneralServices/getAuditorTable";

const Context = React.createContext({});

export function AuditorTableGeneralContext({ children }) {
  const { jwt } = useContext(UserContext);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatePatients, isUpdatePatient] = useState(false);
  let errorMessage = "";

  function formatListTable(data) {
    let dataFormated = [];
    data.map((patient) => {
      let patientData = {
        ID_HISTORY: patient.ID_HISTORY,
        DATE_CREATE: patient.DATE_CREATE,
        DESCRIPTION_HISTORY_USER : patient.DESCRIPTION_HISTORY_USER
      };
      dataFormated.push(Object.assign({}, patientData));
      return true;
    });
    return dataFormated;
  }
  useEffect(() => {
    setLoading(true);
    getAuditorTable({ jwt })
      .then((res) => {
        if (res.message === undefined) {
          setLoading(false);
          setPatients(formatListTable(res));
          isUpdatePatient(false);
        } else {
          setLoading(false);
          errorMessage = res.message;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [updatePatients, jwt]);

  return (
    <Context.Provider
      value={{
        patients,
        setPatients,
        errorMessage,
        loading,
        setLoading,
        isUpdatePatient,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
