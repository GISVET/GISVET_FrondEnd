import { useContext,useState,useEffect} from "react";
import userContext from "../context/UserContext";
import { dependenciesAdmin } from "../constants/headersTables";
import getDependencyDetails from "../services/getDependencyDetail";
import { gender } from "../constants/constants";

export function useAdminOneDependency(id_dependencie) {
  const { jwt } = useContext(userContext);
  const [dependency, setDependency] = useState();
  const [persons, setPersons] = useState();
  const [loading, setLoading] = useState();
  let errorMessage = "";

  useEffect(()=>{
    askDependency()
},[])


  const askDependency = ()=>{
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
  }

  function formatListUsers(){
    let dataFormated = []
    const dataPersons = dependency.person_dependencies;
    dataPersons.map((person)=>{
        const gender_person = gender.find(element => element.id === person.persons.GENDER);  

        let personData={
            id_person:person.persons.ID_PERSON,
            full_name:person.persons.FULL_NAME,
            document:`${person.persons.DOCUMENT_TYPE} ${person.persons.DOCUMENT}`,
            gender_person:gender_person.name,
            profesional_id:person.persons.PROFESSIONAL_ID,
        }
        dataFormated.push(personData);
    })
    setPersons(dataFormated);
}

  return {
    loading,
    setLoading,
    dependency,
    persons,
    headers: dependenciesAdmin,
    askDependency,
    formatListUsers,
  };
}
