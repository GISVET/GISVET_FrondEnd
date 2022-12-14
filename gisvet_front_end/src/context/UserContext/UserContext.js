import React, {useState, useEffect} from "react";
import decode from 'jwt-decode'

const Context = React.createContext({})

export function UserContextProvider({children}){
    const [jwt, setJWT] = useState(window.sessionStorage.getItem('Auth'))
    const [role, setRole] = useState(null)
    const [email, setEmail] = useState(null)
    const [rolesUser, setRolesUser] = useState([])
    const [idUser, setIdUser] = useState({})
    const [dependencies, setDependencies] = useState([])
    const [dependencieActive, setDependencieActive] = useState({})

    useEffect(()=>{
        if(jwt !== null){
            window.sessionStorage.setItem('Auth',jwt)
            const token = decode(jwt)
            setEmail(token.object[0].EMAIL)
            setRole(token.object[0].NAME_ROL)
            setIdUser(token.object[0].ID_PERSON)
            setDependencies(token.object[0].DEPENDECIES)
            setRolesUser(token.object[0].ROLES)
            setDependencieActive(token.object[0].DEPENDECIES.lenght !== 0?token.object[0].DEPENDECIES[0]: {})
        }else{
            setRole(null)
            setIdUser(null)
            setDependencies(null)
            setDependencieActive(null)
            setRolesUser(null)
            setEmail(null)
        }
    },[jwt, setJWT])


    const valuesReturn = {
        jwt, 
        setJWT,
        role,
        email,
        idUser,
        dependencies,
        dependencieActive, 
        rolesUser,
        setDependencieActive,
        setRole
    }

    return <Context.Provider value={valuesReturn}>
        {children}
    </Context.Provider>
}

export default Context