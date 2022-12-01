const endpoint = process.env.REACT_APP_ENDPOINT
export default function addRolToUser({jwt,id_rol,id_person}){
    let statusRes =0
    return fetch(`${endpoint}/Admin/createUserRoles` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: JSON.stringify({
            id_rol,
            id_person})
    }).then(res => {
        statusRes = res.status
        return res.json()
    }).then(res => {
        const resAux={
            'message':res.message,
            'status':statusRes
        }
        return resAux
    })
}