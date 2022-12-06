//=====Importaciones de React ====
import { useContext } from "react";

//=====Importaciones de contextos ====
import auditorTableGeneralContext from "context/AuditorContext/AuditorTableGeneralContext";

//=====Importaciones de constantes ====
import { auditorTableGeneral } from "constants/headersTables";

export function useAuditorTableGeneral() {
  const { patients, loading } = useContext(auditorTableGeneralContext);

  return {
    loading,
    patients,
    headers: auditorTableGeneral,
  };
}
