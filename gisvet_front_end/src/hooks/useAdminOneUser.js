
import { useContext, useCallback, useState } from "react"
import userContext from "../context/UserContext"
import adminUserContext from "../context/AdminUserContext"
import { dependenciesByUser } from "../constants/headersTables";
import {useRolesList} from "../hooks/useRoles"
import { useEffect } from "react";

const cleanFormat= function(data){
    let userFormat = Object.assign({}, data)
    userFormat.PROFESSIONAL_ID = data.PROFESSIONAL_ID== 'null'?'sin agregar':data.PROFESSIONAL_ID
    if (userFormat.accounts != 0) {
        userFormat['EMAIL'] = data.accounts.length == 0?'sin agregar':data.accounts[0].EMAIL
    }
    return userFormat;
}


export function useAdminOneUser(document) {
    const {jwt} = useContext(userContext)
    const {users,loading, setLoading, isUpdateUsers} = useContext(adminUserContext)
    const {listRoles} = useRolesList();
    const loadingListRols = useRolesList().loading;
    let userTemp = users.find(item => item.DOCUMENT== document)
    const [user,setUser] = useState(cleanFormat(userTemp))
    const [roles,setRoles] = useState([])
    const [dependencies,setDependencies] = useState([])
    let errorMessage = ""

    useEffect(()=>{
        if(listRoles.length != 0){
            setRoles(getUserRoles)
            setDependencies(getUserDependencies)
        }
    },[loadingListRols])

    const getUserRoles = ()=>{
        let roles =[]
        if (user.user_roles != 0) {
            user.user_roles.map(rol =>{
                let rolFormat={}
                rolFormat['id_rol'] = rol.ID_ROL
                rolFormat['name_rol'] = listRoles.find(item =>item.ID_ROL == rol.ID_ROL).NAME_ROL
                roles.push(rolFormat)
            })
        }
        return roles
    }

    const getUserDependencies = ()=>{
        let dependencies =[]
        if (user.person_dependencies.length != 0) {
            user.person_dependencies.map(dependencie =>{
                let dependencieFormat={}
                dependencieFormat['id_dependencie'] = dependencie.ID_DEPENDENCIE
                dependencieFormat['name_dependencie'] = dependencie.dependencies.DEPENDENCIE_NAME
                dependencieFormat['type_dependencie'] = dependencie.dependencies.TYPE_DEPENDENCIE
                dependencies.push(dependencieFormat)
            })
        }
        return dependencies
    }

    const dependeciesToTable = function(dependencieIn){
        let dependenciesAux =[]
        dependencieIn.map(item =>{
            let objectAux={}
            objectAux['id_dependencie'] = item.id_dependencie
            objectAux['name_dependencie'] = item.name_dependencie
            dependenciesAux.push(objectAux)
       })
       return dependenciesAux
    }


    
    /*const AssignDependency = useCallback(({document,id_dependency})=>{
        setLoading(true)
        addNewUser({jwt,document,id_dependency})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message
                    isUpdateUsers(true)
                    
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [setLoading])

*/

     return {
       loading, 
       user,
       headersDependencies: dependenciesByUser,
       roles,
       dependencies,
       dependeciesToTable
    }
}


