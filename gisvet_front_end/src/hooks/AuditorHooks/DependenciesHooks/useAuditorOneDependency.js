//=====Importaciones de React ====
import {useContext,useState , useEffect} from "react";

import userContext from "context/UserContext/UserContext";


//=====Importaciones de constantes ====
import { gender } from "constants/constants";
import { dependenciesAdmin } from "constants/headersTables";

import getDependencyDetails from "services/AuditorServices/DependenciesServices/getDependencyDetail";


export function useAuditorOneDependency(id_dependencie) {
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
        if (res.message !== undefined) {
          setLoading(false);
        } else {
          setLoading(false);
          errorMessage = res.message;
          setDependency(res);
        }
      })
      .catch((err) => {});
  };

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
    formatListUsers,
  };
}
