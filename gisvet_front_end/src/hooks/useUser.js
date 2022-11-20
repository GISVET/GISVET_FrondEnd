import { useCallback, useContext, useState } from "react"
import Context from "context/UserContext"
import loginServices from "services/login"


export default function useUser() {
    const {jwt,
            role,
            IdUser,
            setRole,
            dependencies,
            dependencieActive, 
            setDependencieActive,
            setJWT} = useContext(Context)
    const [errorMessage, setErrorMessage] = useState('')

    const login = useCallback(({username, password})=>{
        loginServices({username, password})
            .then(res => {
                if(res.token === undefined){
                    setErrorMessage(res.message) 
                }else{
                    setJWT(res.token)
                }
            })
            .catch(err => {
                window.sessionStorage.removeItem('Auth')
                console.error(err)
            })
    }, [setJWT])

    const changeRol =  useCallback(({username, password})=>{
        loginServices({username, password})
            .then(res => {
                if(res.token === undefined){
                    setErrorMessage(res.message) 
                }else{ 
                    console.log(res)
                    setJWT(res.token)
                }
            })
            .catch(err => {
                window.sessionStorage.removeItem('Auth')
                console.error(err)
            })
    }, [setJWT])

    const logout =  useCallback(()=>{
        window.sessionStorage.removeItem('Auth')
        setJWT(null)
    }, [setJWT])

    return {
        islogged: Boolean(jwt),
        login,
        role,
        IdUser,
        dependencies,
        dependencieActive,
        logout,
        errorMessage
    }
}