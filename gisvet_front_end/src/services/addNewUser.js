const ENDPOINT = 'http://localhost:3001'

export default function addNewUser({jwt,data}){
    let jsonUser = JSON.stringify(data)
    return fetch(`${ENDPOINT}/Admin/Users/createUser`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonUser
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        return res.message
    })
}