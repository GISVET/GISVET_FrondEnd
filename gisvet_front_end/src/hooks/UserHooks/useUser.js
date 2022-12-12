//=====Importaciones de React ====
import React,{ useCallback, useContext, useState, useEffect } from "react"

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";

//=====Importaciones de servicios ====
import loginServices from "services/LoginServices/login"
import changeRolService from "services/AdminServices/UsersServices/changeRol"
import generateToken from "services/UserServices/generateToken";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";



export default function useUser() {
    const {jwt,
            role,
            idUser,
            setRole,
            email,
            rolesUser,
            dependencies,
            dependencieActive, 
            setDependencieActive,
            setJWT} = useContext(userContext)
    const [errorMessage, setErrorMessage] = useState('')
    const [,navigate] = useLocation()

    useEffect(()=>{
        if (role === undefined || role === null) {
            navigate("/")
        }
    },[role])

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
                    navigateRol(name_rol)
                }
            })
            .catch(err => {
                window.sessionStorage.removeItem('Auth')
                console.error(err)
            })
    }, [setJWT])

    const navigateRol = (rol_name)=>{
        switch (rol_name) {
            case 'Administrador':
                break;
            case 'Usuario':
                break;
            case 'Auditor':
                break;
            case null:
                navigate("/")
                break;
            default:
                navigate("/unauthorized")
                break;
        }

    }

    const changeDependencie = (id_dependencie)=>{
        let dependencieAux = dependencies.find(dep=>dep.ID_DEPENDECIE === id_dependencie)
        if (dependencieAux !== undefined) {
            setDependencieActive(dependencieAux)
        }
    }

    const generateTokenAuth = async ()=>{
        let response={}
        let res = await generateToken({jwt, idUser})
        console.log(res)
        response["status"]= res.status
        if(res.status === 200){
            response["message"]= "Token Generado y enviado exitosamente"
        }else{
            response["message"]= "Ocurrió un error intenta nuevamente" 
        }
        return response
    }

    const logout =  useCallback(()=>{
        window.sessionStorage.removeItem('Auth')
        setJWT(null)
    }, [setJWT])

  



    return {
        islogged: Boolean(jwt),
        login,
        role,
        email,
        idUser,
        dependencies,
        rolesUser,
        generateTokenAuth,
        changeRol,
        dependencieActive,
        changeDependencie,
        logout,
        errorMessage
    }
}