
import { useContext, useCallback, useState } from "react"
import userContext from "../context/UserContext"
import adminUserContext from "../context/AdminUserContext"
import { usersAdmin } from "../constants/headersTables";
import addNewUser from "../services/addNewUser"


export function useUsersAdmin() {
    const {jwt} = useContext(userContext)
    const {users,loading, setLoading, isUpdateUsers} = useContext(adminUserContext)
    let errorMessage = ""
    

    const addUser = useCallback(({full_name,document_type,document,gender, professional_id,id_department})=>{
        setLoading(true)
        addNewUser({jwt,full_name,document_type,document,gender, professional_id,id_department})
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



     return {
       loading, 
       users,
       headers: usersAdmin,
       addUser,
    }
}


