import { useCallback, useContext, useState } from "react"
import Context from "context/AdminContext"
import loginServices from "services/login"


export default function useUser() {
    const {jwt, setJWT} = useContext(Context)
    const [errorMessage, setErrorMessage] = useState('')

    const login =  useCallback(({username, password})=>{
        loginServices({username, password})
            .then(res => {
                if(res.token === undefined){
                    setErrorMessage(res.message) 
                }else{ 
                    console.log(errorMessage)
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