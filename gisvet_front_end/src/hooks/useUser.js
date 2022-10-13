import { useCallback } from "react"
import { useContext } from "react"
import Context from "../context/UserContext"
import loginServices from "../services/login"


export default function useUser() {
    const {jwt, setJwt} = useContext(Context)

    const login =  useCallback((username, password)=>{
        loginServices({username, password})
        .then(jwt => {
            setJwt(jwt)
        })
        .catch(err => {
            console.error(err)
        })
       
    }, [setJwt])

    const logout =  useCallback(()=>{
        setJwt('test')
    }, [setJwt])

    return {
        islogged: Boolean(jwt),
        login,
        logout
    }
}