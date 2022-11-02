import { useContext, useCallback, useState, useEffect } from "react";
import userContext from "../context/UserContext";
import { dependenciesAdmin } from "../constants/headersTables";
import getDependencyDetails from "../services/getDependencyDetail";
import updateDependency from "../services/updateDependency";
import { gender } from "../constants/constants";

export function useAdminOneDependency(id_dependencie) {
  const { jwt } = useContext(userContext);
  const [dependency, setDependency] = useState();
  const [persons, setPersons] = useState();
  const [loading, setLoading] = useState();
  let errorMessage = "";

  useEffect(() => {
    askDependency();
  }, []);

  const askDependency = () => {
    setLoading(true);
    getDependencyDetails({ jwt, id_dependencie })
      .then((res) => {
        if (res.message === "") {
          setLoading(false);
        } else {
          setLoading(false);
          errorMessage = res.message;
          setDependency(res);
        }
      })
      .catch((err) => {});
  };

  const updateDependencyFunction = useCallback(
    ( id_dependencie, dependencie_name ) => {
      setLoading(true);
      console.log("Antes de enviar el endpoint")
      console.log(`En el hookk Llega el id ${id_dependencie}  y el name ${dependencie_name}`)
      updateDependency({ jwt, id_dependencie, dependencie_name })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  function formatListUsers() {
    let dataFormated = [];
    const dataPersons = dependency.person_dependencies;
    dataPersons.map((person) => {
      const gender_person = gender.find(
        (element) => element.id === person.persons.GENDER
      );
      const profesionalIdValidation  = (person.persons.PROFESSIONAL_ID==='null')?"No aplica":person.persons.PROFESSIONAL_ID;     


      let personData = {
        id_person: person.persons.ID_PERSON,
        full_name: person.persons.FULL_NAME,
        document: `${person.persons.DOCUMENT_TYPE} ${person.persons.DOCUMENT}`,
        gender_person: gender_person.name,
        profesional_id: profesionalIdValidation,
      };
      dataFormated.push(personData);
    });
    setPersons(dataFormated);
  }

  return {
    loading,
    setLoading,
    dependency,
    persons,
    headers: dependenciesAdmin,
    askDependency,
    updateDependencyFunction,
    formatListUsers,
  };
}
