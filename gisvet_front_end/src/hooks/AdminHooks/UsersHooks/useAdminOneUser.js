//=====Importaciones de React ====
import { useContext, useCallback, useState ,useEffect } from "react"

//=====Importaciones de contextos ====
import userContext from "../../../context/UserContext/UserContext";
import adminProductsContext from "../../../context/AdminContext/AdminProductsContext";
import adminUserContext from "../../../context/AdminContext/AdminUserContext"

//=====Importaciones de servicios ====
import getUsersByDocument from "../../../services/AdminServices/UsersServices/getUserByDocument"
import updateUser from "../../../services/AdminServices/UsersServices/updateUser"
import registerUser from "../../../services/LoginServices/registerAccount"

//=====Importaciones de constantes ====
import { dependenciesByUser } from "constants/headersTables";
import { typeDependencies } from "constants/constants";

//=====Importaciones de hooks ====
import {useRolesList} from "../../../hooks/AdminHooks/GeneralHooks/useRoles"


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
    const {loading, setLoading, isUpdateUsers} = useContext(adminUserContext)
    const {listRoles} = useRolesList();
    const loadingListRols = useRolesList().loading;
    const [user,setUser] = useState()
    const [roles,setRoles] = useState([])
    const [loadingUser,setLoadingUser] = useState(true)
    const [dependencies,setDependencies] = useState([])
    let errorMessage = ""

    const getUserById = ()=>{
        getUsersByDocument({jwt,document})
            .then(res => {
                if(res.message === ''){
                    setLoadingUser(false)
                }else{
                    setLoadingUser(false)
                    errorMessage = res.message
                    setUser(cleanFormat(res))
                }
            })
            .catch(err => {
                console.error(err)
            })
    }


    useEffect(()=>{
        if(listRoles.length != 0){
            getUserById(document)
            if(user != undefined){
                setRoles(getUserRoles)
                setDependencies(getUserDependencies)
            }
        }
    },[loadingListRols, loadingUser])

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
            objectAux['type_dependencie'] = (typeDependencies.find(dep=> dep.id ==item.type_dependencie)).name
            dependenciesAux.push(objectAux)
       })
       return dependenciesAux
    }

    const useUpdateUser = useCallback((userToData,{full_name,
                                    document_type,
                                    document,
                                    email,
                                    password
                                    }
        )=>{
            const userAux = {
                "id_person": parseInt(userToData.ID_PERSON),
                "full_name": full_name,
                "document_type": document_type,
                "document": document,
                "gender": userToData.GENDER,
                "professional_id": userToData.PROFESSIONAL_ID
            }
            setLoading(true)
            const userAccount={
                "email": email,
                "password_account": password,
                "id_person":parseInt(userToData.ID_PERSON)
            }
            return updateUser({jwt,data:userAux})
                .then(res => {
                    if(res.message === ''){
                        setLoading(false)
                    }else{
                        setLoading(false)
                        isUpdateUsers(true)
                    }
                    registerUser({jwt,userAccount})
                        .then(resAC => {
                            if(resAC.message === ''){
                                setLoading(false)
                            }else{
                                setLoading(false)
                                getUserById(document)
                                isUpdateUsers(true)
                            }
                        })
                        .catch(err => {
                            console.error(err)
                        })
                    return res
                })
                .catch(err => {
                    console.error(err)
                })
            
            }, [setLoading])

     return {
       loading, 
       user,
       headersDependencies: dependenciesByUser,
       roles,
       useUpdateUser,
       getUserById,
       dependencies,
       dependeciesToTable
    }
}


