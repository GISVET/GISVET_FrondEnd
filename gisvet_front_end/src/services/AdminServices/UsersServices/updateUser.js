const endpoint = process.env.REACT_APP_ENDPOINT

export default function updateUser({jwt,data}){
    let jsonUser = JSON.stringify(data)
    let statusRes =0
    return fetch(`${endpoint}/Admin/Users/updatePerson`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonUser
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