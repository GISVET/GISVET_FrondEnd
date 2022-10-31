
import { useContext, useCallback, useState } from "react"
import userContext from "../context/UserContext"
import adminUserContext from "../context/AdminUserContext"
import { usersAdmin } from "../constants/headersTables";
import addNewUser from "../services/addNewUser"
import getUsersByDocument from "../services/getUserByDocument"


export function useUsersAdmin() {
    const {jwt} = useContext(userContext)
    const {users,loading, setLoading, isUpdateUsers, formatListUserToTable} = useContext(adminUserContext)
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
        setLoading(true)
        addNewUser({jwt,full_name,
                    document_type,
                    document,
                    gender,
                    professional_id,
                    id_rol,
                    email,
                    password
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
       userByDocument,
       listUserToTable: formatListUserToTable(users)
    }
}


