
import { useContext, useCallback, useState } from "react"
import userContext from "../context/UserContext"
import adminDependencyContext from "../context/AdminDependencyContext"
import { dependenciesAdmin } from "../constants/headersTables";
import addNewDependency from "../services/addNewUser"


export function useDependenciesAdmin() {
    const {jwt} = useContext(userContext)
    const {dependencies,loading, setLoading, isUpdateDependencies} = useContext(adminDependencyContext)
    let errorMessage = ""
    

    const addDependency = useCallback(({full_name,document_type,document,gender, professional_id,id_department})=>{
        setLoading(true)
        addNewDependency({jwt,full_name,document_type,document,gender, professional_id,id_department})
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



     return {
       loading, 
       dependencies,
       headers: dependenciesAdmin,
       addDependency,
    }
}


