//=====Importaciones de React ====
import React, { useContext, useEffect, useState } from "react";

//=====Importaciones de contextos ====
import UserContext from "../UserContext/UserContext";

//=====Importaciones de servicios ====
import getPatientsList from "../../services/AdminServices/PatientsServices/getPatientsList";

const Context = React.createContext({});

function formatListPatients(data) {
  let dataFormated = [];
  data.map((patient) => {
    let patientData = {
      id_clinic_history: patient.ID_CLINIC_HISTORY,
      name_patient: patient.NAME_PATIENT,
    };
    dataFormated.push(Object.assign({}, patientData));
    return true;
  });
  return dataFormated;
}

export function AdminPatientsContextProvider({ children }) {
  const { jwt } = useContext(UserContext);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatePatients, isUpdatePatient] = useState(false);
  let errorMessage = "";

  useEffect(() => {
    setLoading(true);
    getPatientsList({ jwt })
      .then((res) => {
        if (res.message === undefined) {
          setLoading(false);
          setPatients(formatListPatients(res));
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
