
import { useContext, useCallback, useState } from "react"
import userContext from "../context/UserContext"
import adminPatientContext from "../context/AdminPatientsContext"
import {patientsAdmin } from "../constants/headersTables";
import addNewPatient from "../services/addNewPatient"


export function useAdminPatients() {
    const {jwt} = useContext(userContext)
    const {patients,loading, setLoading, isUpdatePatient} = useContext(adminPatientContext)
    let errorMessage = ""
    

    const addPatient = useCallback(({id_clinic_history,name_patient})=>{
        setLoading(true)
        addNewPatient({jwt,id_clinic_history,name_patient})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message
                    isUpdatePatient(true)
                    
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [setLoading])



     return {
       loading, 
       patients,
       headers: patientsAdmin,
       addPatient,
    }
}


