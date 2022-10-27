import React, {useCallback, useContext ,useEffect, useState} from "react";
import userContext from "../context/UserContext"
import getUsersList from "../services/getUserList"
import { typeDoc } from "../constants/constants";
import { gender } from "../constants/constants";
import { role } from "../constants/constants";



const Context = React.createContext({})

function formatListUsers(data){
    let dataFormated = []
    data.map((person)=>{
        const doc = typeDoc.find(element => element.id === person.DOCUMENT_TYPE);  
        const genderOption = gender.find(element => element.id === person.GENDER);   
        const roleOption = role.find(element => element.id === person.ID_ROL);    
        const profesionalIdValidation  = (person.PROFESSIONAL_ID==='null')?"No aplica":person.PROFESSIONAL_ID;     
        let personData={
            tipoDoc:doc.name,
            document:person.DOCUMENT,
            name:person.FULL_NAME,
            gender:genderOption.name,
            professional_id:profesionalIdValidation,
            dependencie:person.dependencies.DEPARTMENT_NAME,
            rol:''       
        }
        if(person.user_roles.length == 0  ){
            personData.rol= role.find(element => element.id === 0).name;  
            dataFormated.push(personData);
        }else{
            person.user_roles.map((personRol)=>{
                personData.rol = role.find(element => element.id === personRol.ID_ROL).name;
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
    const [updateUsers, isUpdateUsers] = useState(false)
    let errorMessage = ""
    
    
    useEffect(()=>{
        setLoading(true)
        getUsersList({jwt})
            .then(res => {
                if(res.message === undefined){
                    setLoading(false)
                    setUsers(formatListUsers(res))
                    isUpdateUsers(false)
                }else{
                    setLoading(false)
                    errorMessage = res.message
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, [updateUsers,jwt])

    return <Context.Provider value={
        {   
            users, 
            setUsers, 
            errorMessage, 
            loading, 
            setLoading,
            isUpdateUsers
        }}>
        {children}
    </Context.Provider>
}

export default Context