import React, {useContext ,useEffect, useState} from "react";
import userContext from "../context/UserContext"
import getUsersList from "../services/getUserList"

const Context = React.createContext({})

function formatListUsers(data){
    let dataFormated = []
    data.map((person)=>{
        let personData={
            tipoDoc:person.DOCUMENT_TYPE,
            document:person.DOCUMENT,
            name:person.FULL_NAME,
            gender:person.GENDER,
            professional_id:person.PROFESSIONAL_ID,
            dependencie:person.dependencies.DEPARTMENT_NAME,
            rol:''       
        }
        if(person.user_roles.length ==0  ){
            personData.rol= ''
            dataFormated.push(personData);
        }else{
            person.user_roles.map((personRol)=>{
                personData.rol = personRol.ID_ROL
                dataFormated.push(Object.assign({}, personData));
            })
        }
    })
   
    return dataFormated
}

export function AdminUserContextProvider({children}){
    const {jwt} = useContext(userContext)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    let errorMessage = ""

    
    useEffect(()=>{
        setLoading(true)
        getUsersList({jwt})
            .then(res => {
                if(res.message === undefined){
                    setLoading(false)
                    setUsers(formatListUsers(res))
                }else{
                    setLoading(false)
                    errorMessage = res.message
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [users])

    return <Context.Provider value={
        {   
            users, 
            setUsers, 
            errorMessage, 
            loading, 
            setLoading
        }}>
        {children}
    </Context.Provider>
}

export default Context