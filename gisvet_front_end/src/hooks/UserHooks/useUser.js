//=====Importaciones de React ====
import { useCallback, useContext, useState, useEffect } from "react"

//=====Importaciones de contextos ====
import userContext from "../../context/UserContext/UserContext";

//=====Importaciones de servicios ====
import loginServices from "../../services/LoginServices/login"
import changeRolService from "../../services/AdminServices/UsersServices/changeRol"

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";



export default function useUser() {
    const {jwt,
            role,
            IdUser,
            setRole,
            rolesUser,
            dependencies,
            dependencieActive, 
            setDependencieActive,
            setJWT} = useContext(userContext)
    const [errorMessage, setErrorMessage] = useState('')
    const [,navigate] = useLocation()

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

    const changeRol =  useCallback((name_rol)=>{
        changeRolService({jwt, name_rol})
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

    const changeDependencie = (id_dependencie)=>{
        let dependencieAux = dependencies.find(dep=>dep.ID_DEPENDECIE === id_dependencie)
        if (dependencieAux !== undefined) {
            setDependencieActive(dependencieAux)
        }
    }

    const logout =  useCallback(()=>{
        window.sessionStorage.removeItem('Auth')
        setJWT(null)
    }, [setJWT])



    useEffect(()=>{
        switch (role) {
            case 'Administrador':
                navigate("/AdminDependencies")
                break;
            case 'Usuario':
                navigate("/user")
                break;
            case 'Auditor':
                navigate("/AuditorDependencies")
                break;
            case null:
                navigate("/")
                break;
            default:
                navigate("/unauthorized")
                break;
        }
    },[role])

    return {
        islogged: Boolean(jwt),
        login,
        role,
        IdUser,
        dependencies,
        rolesUser,
        changeRol,
        dependencieActive,
        changeDependencie,
        logout,
        errorMessage
    }
}