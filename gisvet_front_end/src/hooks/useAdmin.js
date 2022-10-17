
import { useCallback, useContext, useState } from "react"
import Context from "../context/UserContext"
import getUsersList from "../services/getUserList"

export function useUsersList() {
    const {jwt, setJWT} = useContext(Context)
    const [listUser, setListUser] = useState([])
    let errorMessage = ""

    const userList =  useCallback(()=>{
        getUsersList({jwt})
            .then(res => {
                if(res.status != 200){
                    errorMessage = res.message
                }else{
                    console.log("we got  changes")
                    setListUser(res)
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [setListUser])

    return {
        userList:userList
    }


}