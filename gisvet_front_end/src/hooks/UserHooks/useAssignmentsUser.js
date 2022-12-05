//=====Importaciones de React ====
import React,{ useCallback, useContext, useState, useEffect } from "react"

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";

//=====Importaciones de servicios ====
import getDependenciesByDocument from "services/UserServices/getDependenciesByDocument";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";


const filterDependencies= (listDep, currentDependencieType)=>{
    let dependenciesFilter = []
    let typeDependencieToApply = 'F'
    switch (currentDependencieType) {
        case 'F':
            typeDependencieToApply ='C'
            break;
        default:
            typeDependencieToApply ='F'
            break;
    }
    dependenciesFilter = listDep.filter(item => item.TYPE_DEPENDENCIE === typeDependencieToApply)
    return dependenciesFilter
}



export default function useAssignmentsUser() {
    const {jwt, dependencieActive} = useContext(userContext)
    const [,navigate] = useLocation()

    const dependenciesByDocument = async (document)=>{
        let response = []
        console.log(dependencieActive)
        await getDependenciesByDocument({jwt, document})
            .then(res => {
                if (res.message === undefined) {
                    response = filterDependencies(res,dependencieActive.TYPE_DEPENDENCIE)
                }else{
                    response = res
                }
                
            })
            .catch(err => {
                console.error(err)
            })
        return response
    }

    return {
        dependenciesByDocument
    }
}