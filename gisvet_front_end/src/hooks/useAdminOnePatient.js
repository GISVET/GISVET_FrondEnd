import { useContext, useCallback, useState, useEffect } from "react";
import userContext from "context/UserContext";
import { dependenciesAdmin } from "constants/headersTables";
import getPatientById from "services/getPatientById";
import { presentations } from "constants/constants";


export function useAdminOnePatient(id_clinic_history) {
  const { jwt } = useContext(userContext);
  const [patient, setPatient] = useState();
  const [persons, setPersons] = useState();
  const [loading, setLoading] = useState();

  let errorMessage = ""
  console.log("El id del paciente que llega al OnePatient es : ")
  console.log(id_clinic_history)

  useEffect(() => {
    askPatient();
    console.log("El paciente desde el servicio es ")
    console.log(patient)
  }, []);

  const askPatient = () => {
    setLoading(true);
    console.log("Inicia en el askPatient")
    getPatientById({ jwt, id_clinic_history })
      .then((res) => {
        if (res.message === "") {
          setLoading(false);
        } else {
          setLoading(false);
          errorMessage = res.message;
          console.log("La respuesta que llega es")
          console.log(res)
          setPatient(formatListHistory(res));
        }
      })
      .catch((err) => {});
  };

  function formatListHistory(dataBody) {
    let dataFormated = [];
    console.log("El databody que llega al format es ")
    console.log(dataBody)
    dataBody.map((history) => {

      console.log("El history que pasa por el map es")
      console.log(history)

      
      const measurement = presentations.find(
        (element) => element.id === history.UNIT_MEASUREMENT
      );
      let historyData = {
        ID_CLINIC_HISTORY : history.ID_CLINIC_HISTORY,
        DATE_PRODUCT_TRACING: history.DATE_PRODUCT_TRACING,
        DOCUMENT_PERSON: history.DOCUMENT_PERSON,
        FULL_NAME_PERSON: history.FULL_NAME_PERSON,
        ID_PRODUCT_TC: history.ID_PRODUCT_TC,
        UNIT_MEASUREMENT: measurement.name,
        PRODUCT_NAME: history.PRODUCT_NAME,
        QUANTITY_USED: history.QUANTITY_USED,
        DESTINY_SERVICE: history.DESTINY_SERVICE,
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
