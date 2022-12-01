//=====Importaciones de React ====
import { useContext, useCallback, useState, useEffect } from "react";

//=====Importaciones de contextos ====
import userContext from "../../../context/UserContext/UserContext";


//=====Importaciones de servicios ====
import getDependencyDetails from "../../../services/AdminServices/DependenciesServices/getDependencyDetail";
import updateDependency from "../../../services/AdminServices/DependenciesServices/updateDependency";

//=====Importaciones de constantes ====
import { gender } from "constants/constants";
import { dependenciesAdmin } from "constants/headersTables";

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
      return updateDependency({ jwt, id_dependencie, dependencie_name })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
          }
          return res
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
    console.log("El person que llega al formatList de OneDependency")
    console.log(dataPersons)
    console.log("El res que llega al formatList de OneDependency")
    console.log(dependency)
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
