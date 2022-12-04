//=====Importaciones de React ====
import React, {useCallback, useContext ,useEffect, useState} from "react";

//=====Importaciones de contextos ====
import UserContext from "../UserContext/UserContext";

//=====Importaciones de servicios ====
import getDependenciesList from "../../services/AuditorServices/DependenciesServices/getDependenciesListAuditor"

//=====Importaciones de constantes ====
import { typeDependencies } from "constants/constants";


const Context = React.createContext({})


export function formatListDependencies(data){

    let dataFormated = []
    data.map((dependencie)=>{
        const typeDependencieData = typeDependencies.find(element => element.id === dependencie.TYPE_DEPENDENCIE);  
        let dependencyData={
            id_dependencie:dependencie.ID_DEPENDENCIE,
            dependencie_name:dependencie.DEPENDENCIE_NAME,
            type_dependencie:typeDependencieData.name       
        }
        dataFormated.push(dependencyData);
    })
    return dataFormated
}

export function AuditorDependencyContextProvider({children}){
    const {jwt} = useContext(UserContext)
    const [dependencies, setDependencies] = useState([])
    const [dependency, setDependency] = useState([])
    const [loading, setLoading] = useState(false)
    const [updateDependencies, isUpdateDependencies] = useState(false)
    let errorMessage = ""
    
    
    useEffect(()=>{
        setLoading(true)
        getDependenciesList({jwt})
            .then(res => {
                if(res.message === undefined){
                    setLoading(false)
                    setDependencies(formatListDependencies(res))
                    isUpdateDependencies(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [updateDependencies,jwt])

    return <Context.Provider value={
        {   
            dependencies, 
            setDependencies, 
            dependency,
            setDependency,
            errorMessage, 
            loading, 
            setLoading,
            formatListDependencies,
            isUpdateDependencies
        }}>
        {children}
    </Context.Provider>
}

export default Context