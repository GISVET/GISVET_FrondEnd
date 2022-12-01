
//=====Importaciones de React ====
import { useContext, useEffect, useState } from "react"

//=====Importaciones de contextos ====
import userContext from "../../../context/UserContext/UserContext";

//=====Importaciones de servicios ====
import getRolesList from "../../../services/AdminServices/UsersServices/getRolesList"

export function useRolesList() {
    const {jwt} = useContext(userContext)
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