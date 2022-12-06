//=====Importaciones de React ====
import { useContext } from "react";

//=====Importaciones de contextos ====
import auditorPatientContext from "context/AuditorContext/AuditorPatientsContext";

//=====Importaciones de constantes ====
import { patientsAdmin } from "constants/headersTables";

export function useAuditorPatients() {
  const { patients, loading } = useContext(auditorPatientContext);

  return {
    loading,
    patients,
    headers: patientsAdmin,
  };
}
