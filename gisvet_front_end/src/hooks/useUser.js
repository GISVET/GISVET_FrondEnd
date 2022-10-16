import { useCallback, useContext } from "react"
import Context from "../context/UserContext"
import loginServices from "../services/login"


export default function useUser() {
    const {jwt, setJWT} = useContext(Context)
    let errorMessage = ""

    const login =  useCallback(({username, password})=>{
        loginServices({username, password})
            .then(res => {
                if(res.token == undefined){
                    errorMessage = res.message
                }else{
                    window.sessionStorage.setItem('jwt',res.token)
                    setJWT(res.token)
                }
                
            })
            .catch(err => {
                window.sessionStorage.removeItem('jwt')
                console.error(err)
            })
    }, [setJWT])

    const logout =  useCallback(()=>{
        window.sessionStorage.removeItem('jwt')
        setJWT(null)
    }, [setJWT])

    return {
        islogged: Boolean(jwt),
        login,
        logout,
        errorMessage
    }
}