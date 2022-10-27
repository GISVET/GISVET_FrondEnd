const ENDPOINT = 'http://localhost:3001'

export default function addRolToUser({jwt,id_rol,id_person}){
    return fetch(`${ENDPOINT}/Admin/createUserRoles` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: JSON.stringify({
            id_rol,
            id_person})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res =>{
        return res
    })
}