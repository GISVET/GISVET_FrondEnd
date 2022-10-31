
import { useContext, useCallback, useState } from "react"
import userContext from "../context/UserContext"
import adminPatientContext from "../context/AdminPatientsContext"
import {patientsAdmin } from "../constants/headersTables";
import addNewPatient from "../services/addNewPatient"
import getPatientsAZ from "../services/getPatientsAZ";
import getPatientsZA from "../services/getPatientsZA";
import getNamePatients from "../services/getNamePatients";

export function useAdminPatients() {
    const {jwt} = useContext(userContext)
    const {patients,setPatients,loading, setLoading, isUpdatePatient} = useContext(adminPatientContext)
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

    const orderPatient = useCallback((orderBy)=>{
        console.log(`El valor con el que llega al hook es ${orderBy}`);

        setLoading(true)
        if(orderBy=='AZ'){
        getPatientsAZ({jwt})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message
                    setPatients(res)
                }
            })
            .catch(err => {
                console.error(err)
            })
        }else if (orderBy=='ZA'){
            getPatientsZA({jwt})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message    
                    setPatients(res)                
                }
            })
            .catch(err => {
                console.error(err)
            })
        }
    }, [setLoading])

    const askPatientName = useCallback((name_patient)=>{
        console.log(`El name en el use es ${name_patient}`)
        setLoading(true)
        getNamePatients({jwt,name_patient})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message    
                    setPatients(res)                
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
       orderPatient,
       askPatientName,
    }
}


