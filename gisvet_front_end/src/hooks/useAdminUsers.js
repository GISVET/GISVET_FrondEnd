
import { useContext, useCallback, useState } from "react"
import userContext from "../context/UserContext"
import adminUserContext from "../context/AdminUserContext"
import { usersAdmin } from "../constants/headersTables";
import addNewUser from "../services/addNewUser"
import getUsersByDocument from "../services/getUserByDocument"
import getUsersListName from "../services/getUserListName"
import getUsersListOrder from "../services/getUserListOrder"
import {role} from "../constants/constants";



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
        addNewUser({jwt,data:userData
                })
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

    const orderUsers = useCallback((order_name)=>{
        setLoading(true)
        getUsersListOrder({ jwt, order_name })
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
       users,
       headers: usersAdmin,
       addUser,
       GetUserByDocument,
       findUserByName,
       orderUsers,
       userByDocument,
       errorMessage,
       listUserToTable: formatListUserToTable(users)
    }
}


