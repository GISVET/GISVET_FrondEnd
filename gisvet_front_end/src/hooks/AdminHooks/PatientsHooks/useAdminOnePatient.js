//=====Importaciones de React ====
import { useContext, useCallback, useState, useEffect } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";

//=====Importaciones de servicios ====
import getPatientById from "services/AdminServices/PatientsServices/getPatientById";

//=====Importaciones de constantes ====
import { dependenciesAdmin } from "constants/headersTables";
import { presentations } from "constants/constants";

export function useAdminOnePatient(id_clinic_history) {
  const { jwt } = useContext(userContext);
  const [patient, setPatient] = useState();
  const [persons, setPersons] = useState();
  const [loading, setLoading] = useState(false);

  let errorMessage = "";

  useEffect(() => {
    askPatient();
  }, []);

  const askPatient = () => {
    setLoading(true);
    getPatientById({ jwt, id_clinic_history })
      .then((res) => {
        if (res.message !== undefined) {
          setLoading(false);
        } else {
          setLoading(false);
          errorMessage = res.message;
          setPatient(formatListHistory(res));
        }
      })
      .catch((err) => {});
  };

  function formatListHistory(dataBody) {
    let dataFormated = [];
    dataBody.map((history) => {
      const measurement = presentations.find(
        (element) => element.id === history.UNIT_MEASUREMENT
      );
      let historyData = {
        ID_CLINIC_HISTORY: history.ID_CLINIC_HISTORY,
        DATE_PRODUCT_TRACING: history.DATE_PRODUCT_TRACING,
        DOCUMENT_PERSON: history.DOCUMENT_PERSON,
        FULL_NAME_PERSON: history.FULL_NAME_PERSON,
        ID_PRODUCT_TC: history.ID_PRODUCT_TC,
        UNIT_MEASUREMENT: measurement.name,
        PRODUCT_NAME: history.PRODUCT_NAME,
        QUANTITY_USED: history.QUANTITY_USED,
        DESTINY_SERVICE: "Control",
      };
      dataFormated.push(historyData);
    });
    return dataFormated;
  }

  return {
    loading,
    setLoading,
    patient,
    persons,
    headers: dependenciesAdmin,
  };
}
