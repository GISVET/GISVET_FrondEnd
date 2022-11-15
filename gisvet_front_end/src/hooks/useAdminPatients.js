
import { useContext, useCallback, useState } from "react"
import userContext from "context/UserContext"
import adminPatientContext from "context/AdminPatientsContext"
import {patientsAdmin } from "constants/headersTables";
import addNewPatient from "services/addNewPatient"
import getPatientsAZ from "services/getPatientsAZ";
import getPatientsZA from "services/getPatientsZA";
import getNamePatients from "services/getNamePatients";

export function useAdminPatients() {
    const {jwt} = useContext(userContext)
    const {patients,setPatients,loading, setLoading, isUpdatePatient} = useContext(adminPatientContext)

    const addPatient = useCallback(async ({id_clinic_history,name_patient})=>{
        setLoading(true)
        try {
            const res = await addNewPatient({ jwt, id_clinic_history, name_patient });
            if (res.message === '') {
                setLoading(false);
            } else {
                setLoading(false);
                isUpdatePatient(true);
            }
            return res;
        } catch (err) {
            console.error(err);
        }
    }, [setLoading])

    const orderPatient = useCallback((orderBy)=>{
        setLoading(true)
        if(orderBy=='AZ'){
        getPatientsAZ({jwt})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
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
                    setPatients(res)                
                }
            })
            .catch(err => {
                console.error(err)
            })
        }
    }, [setLoading])

    const askPatientName = useCallback((name_patient)=>{
        setLoading(true)
        getNamePatients({jwt,name_patient})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)   
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


