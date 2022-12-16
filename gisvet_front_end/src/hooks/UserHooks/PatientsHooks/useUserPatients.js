//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import userPatientContext from "context/UserContext/UserPatientsContext";

//=====Importaciones de servicios ====
import addNewPatient from "services/UserServices/PatientsServices/addNewPatient";

//=====Importaciones de constantes ====
import { patientsAdmin } from "constants/headersTables";

export function useUserPatients() {
  const { jwt } = useContext(userContext);
  const { patients, setPatients, loading, setLoading, isUpdatePatient } =
    useContext(userPatientContext);

  const addPatient = useCallback(
    async ({ id_clinic_history, name_patient }) => {
      setLoading(true);
      try {
        const res = await addNewPatient({
          jwt,
          id_clinic_history,
          name_patient,
        });
        if (res.message === "") {
          setLoading(false);
        } else {
          setLoading(false);
          isUpdatePatient(true);
        }
        return res;
      } catch (err) {
        console.error(err);
      }
    },
    [setLoading]
  );

  return {
    loading,
    patients,
    isUpdatePatient,
    headers: patientsAdmin,
    addPatient,
  };
}
