const endpoint = process.env.REACT_APP_ENDPOINT
export default function assignDependecieUser({jwt,id_dependencie,id_person}){
    let statusRes =0
    console.log(`Esto llego al service ${id_dependencie} y el ${id_person}`)
    return fetch(`${endpoint}/Admin/createDependencieUser` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: JSON.stringify({
            id_dependencie,
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