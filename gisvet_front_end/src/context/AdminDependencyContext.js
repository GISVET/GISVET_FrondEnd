import React, {useCallback, useContext ,useEffect, useState} from "react";
import userContext from "./UserContext"
import getDependenciesList from "../services/getDependenciesList"
import { typeDependencies } from "../constants/constants";


const Context = React.createContext({})


function formatListDependencies(data){
    console.log("Entra en el format de las dependencias")
    let dataFormated = []
    data.map((dependencie)=>{
        console.log(dependencie.TYPE_DEPENDENCIE)
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

export function AdminDependencyContextProvider({children}){
    const {jwt} = useContext(userContext)
    const [dependencies, setDependencies] = useState([])
    const [loading, setLoading] = useState(false)
    const [updateDependencies, isUpdateDependencies] = useState(false)
    let errorMessage = ""
    
    
    useEffect(()=>{
        console.log("Entra en el useefect de obtener dependencias")
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
            errorMessage, 
            loading, 
            setLoading,
            isUpdateDependencies
        }}>
        {children}
    </Context.Provider>
}

export default Context