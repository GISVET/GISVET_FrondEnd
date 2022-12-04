//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react"

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import adminUserContext from "context/AdminContext/AdminUserContext"

//=====Importaciones de servicios ====
import addNewUser from "services/AdminServices/UsersServices/addNewUser"
import getUsersByDocument from "services/AdminServices/UsersServices/getUserByDocument"
import getUsersListName from "services/AdminServices/UsersServices/getUserListName"
import assignDependecieUser from "services/AdminServices/DependenciesServices/assignDependecieUser"

//=====Importaciones de constantes ====
import { usersAdmin } from "constants/headersTables";
import {role} from "constants/constants";




export function useUsersAdmin() {
    const {jwt} = useContext(userContext)
    const {users,setUsers, loading, setLoading, isUpdateUsers, formatListUserToTable} = useContext(adminUserContext)
    const [userByDocument, setUserById] = useState({})

    let errorMessage = ""
    

    const addUser = useCallback(({full_name,
                                    document_type,
                                    document,
                                    gender,
                                    professional_id,
                                    id_rol,
                                    email,
                                    password
                                    }
                                )=>{
        const userData ={
            full_name,
            document_type,
            document,
            gender,
            professional_id,
            'name_rol':role.find(item =>item.id == id_rol).name,
            email,
            'password_account':password         
        }
        setLoading(true)
        return addNewUser({jwt,data:userData
                    })
                .then(res => {
                    if(res.message === ''){
                        setLoading(false)
                    }else{
                        setLoading(false)
                        isUpdateUsers(true)  
                    }
                    return res
                })
                .catch(err => {
                    console.log(err)
                    return err
                })
    }, [setLoading])


    const GetUserByDocument = useCallback(({document})=>{
        setLoading(true)
        getUsersByDocument({jwt,document})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message
                    setUserById(res)
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [setLoading])

    const findUserByName = useCallback((name_person)=>{
        setLoading(true)
        getUsersListName({jwt,'username':name_person})
        .then(res => {
            if(res.message === ''){
                setLoading(false)
            }else{
                setLoading(false)
                errorMessage = res.message
                setUsers(res)

            }
        })
        .catch(err => {
            console.error(err)
        })
    }, [setLoading])

    const assignDependency = useCallback(({id_dependencie,id_person})=>{
        console.log(`Esto llego al hook ${id_dependencie} y el ${id_person}`)
        setLoading(true)
        return assignDependecieUser({jwt,id_dependencie,id_person})
            .then(res => {
                if(res.message === ''){
                    setLoading(false)
                }else{
                    setLoading(false)
                    isUpdateUsers(true)
                }
                return res
            })
            .catch(err => {
                console.log(err)
            })
    }, [setLoading])


     return {
       loading, 
       users,
       headers: usersAdmin,
       addUser,
       GetUserByDocument,
       findUserByName,
       assignDependency,
       userByDocument,
       errorMessage,
       listUserToTable: formatListUserToTable(users)
    }
}


