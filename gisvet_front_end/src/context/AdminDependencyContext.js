import React, {useCallback, useContext ,useEffect, useState} from "react";
import userContext from "./UserContext"
import getDependenciesList from "../services/getDependenciesList"
import { role } from "../constants/constants";


const Context = React.createContext({})

function formatListDependencies(data){
    let dataFormated = []
    data.map((dependencie)=>{
        const roleOption = role.find(element => element.id === dependencie.ID_ROL);    
        let dependencyData={
            id:dependencie.id,
            name:dependencie.name,
            rol:roleOption       
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