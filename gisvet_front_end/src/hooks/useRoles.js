
import { useContext, useEffect, useState } from "react"
import Context from "../context/UserContext"
import getRolesList from "../services/getRolesList"

export function useRolesList() {
    const {jwt} = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [listRoles, setListRoles] = useState([])
    let errorMessage = ""

    useEffect(()=>{
        setLoading(true)
        getRolesList({jwt})
            .then(res => {
                if(res.message === undefined){
                    setListRoles(res)
                    setLoading(false)
                }else{
                    errorMessage = res.message
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [])


     return {
       loading, 
       listRoles,
       errorMessage,
    }
}