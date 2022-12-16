//=====Importaciones de React ====
import { useContext, useCallback, useState, useEffect } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";

//=====Importaciones de servicios ====
import getPatientById from "services/UserServices/PatientsServices/getPatientById";

//=====Importaciones de constantes ====
import { dependenciesAdmin } from "constants/headersTables";
import { presentations, measurement_units,destiny_end_product } from "constants/constants";

function formatListHistory(dataBody) {
  let dataFormated = [];
  dataBody.map((history) => {
    let measurement = measurement_units.find(
      (element) => element.id === history.UNIT_MEASUREMENT
    );
    if (measurement === undefined) {
      measurement = presentations.find(
        (element) => element.id === history.UNIT_MEASUREMENT
      );
    }
    const destiny = destiny_end_product.find(
      (item) => item.id === history.DESTINY_SERVICE
    )
    let historyData = {
      "ID_CLINIC_HISTORY": history.ID_CLINIC_HISTORY,
      "DATE_PRODUCT_TRACING": history.DATE_PRODUCT_TRACING,
      "DOCUMENT_PERSON": history.DOCUMENT_PERSON,
      "FULL_NAME_PERSON": history.FULL_NAME_PERSON,
      "ID_PRODUCT_TC": history.ID_PRODUCT_TC,
      "UNIT_MEASUREMENT": measurement.name,
      "PRODUCT_NAME": history.PRODUCT_NAME,
      "QUANTITY_USED": history.QUANTITY_USED,
      "DESTINY_SERVICE":destiny.name,
    };
    dataFormated.push(historyData);
  });
  console.log(dataFormated)
  return dataFormated;
}

export function useUserOnePatient(id_clinic_history) {
  const { jwt } = useContext(userContext);
  const [patient, setPatient] = useState();
  const [patientOrigin, setPatientOrigin] = useState();
  const [persons, setPersons] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    askPatient();
  }, []);

  useEffect(() => {
    console.log(patientOrigin)
  }, [patientOrigin]);

  const askPatient = async() => {
    setLoading(true);
    getPatientById({jwt,id_clinic_history })
      .then((res) => {
        if (res.message !== undefined) {
          setLoading(false);
        } else {
          setPatient(formatListHistory(res));
          setPatientOrigin(res)
          setLoading(false);
        }
      })
      .catch((err) => {});
  };

  return {
    loading,
    setLoading,
    patient,
    patientOrigin,
    persons,
    headers: dependenciesAdmin,
  };
}
