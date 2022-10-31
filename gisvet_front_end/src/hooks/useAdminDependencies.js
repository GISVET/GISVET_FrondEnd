
import { useContext, useCallback, useState } from "react"
import userContext from "../context/UserContext"
import adminDependencyContext from "../context/AdminDependencyContext"
import { dependenciesAdmin } from "../constants/headersTables";
import addNewDependency from "../services/addNewDependency"
import getDependenciesName from "../services/getDependenciesName";
import getDependenciesOrder from "../services/getDependenciesOrder";
import getDependenciesType from "../services/getDependenciesType";

import { typeDependencies } from "../constants/constants";



export function useAdminDependencies() {
    console.log("Entra en el hook - Verificar getList")
    const {jwt} = useContext(userContext)
    const {dependencies,setDependencies,loading,setLoading, isUpdateDependencies} = useContext(adminDependencyContext)
    let errorMessage = ""
    

    const addDependency = useCallback(({dependencie_name,type_dependencie})=>{
        console.log(`Los valores que llegan son ${dependencie_name} ${type_dependencie}`)
        setLoading(true)
        addNewDependency({jwt,dependencie_name,type_dependencie})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message
                    isUpdateDependencies(true)
                    
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [setLoading])

    const orderDependency = useCallback((order_name)=>{
        console.log(`El valor con el que llega al hook es ${order_name}`);
        setLoading(true)
        console.log(`El name en el use es ${order_name}`)
        setLoading(true)
        getDependenciesOrder({jwt,order_name})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message    
                    setDependencies(res)                
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [setLoading])

    const askDependencyType = useCallback((type_dependencie)=>{
        console.log(`El valor con el que llega al hook es ${type_dependencie}`);
        setLoading(true)
        console.log(`El name en el use es ${type_dependencie}`)
        setLoading(true)
        getDependenciesType({jwt,type_dependencie})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message    
                    setDependencies(res)                
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [setLoading])

    const askDependencyName = useCallback((dependencie_name)=>{
        console.log(`El name en el use es ${dependencie_name}`)
        setLoading(true)
        getDependenciesName({jwt,dependencie_name})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message    

                    let dataFormated = []
                    res.map((dependencie)=>{
                        console.log(dependencie.TYPE_DEPENDENCIE)
                        const typeDependencieData = typeDependencies.find(element => element.id === dependencie.TYPE_DEPENDENCIE);  
                        let dependencyData={
                            id_dependencie:dependencie.ID_DEPENDENCIE,
                            dependencie_name:dependencie.DEPENDENCIE_NAME,
                            type_dependencie:typeDependencieData.name       
                        }
                        dataFormated.push(dependencyData);
                    })
                    setDependencies(dataFormated)
                }
            })
            .catch(err => {
                setDependencies([])
            })
    }, [setLoading])



     return {
       loading,
       setLoading, 
       dependencies,
       headers: dependenciesAdmin,
       addDependency,
       orderDependency,
       askDependencyName,
       askDependencyType,
    }
}


