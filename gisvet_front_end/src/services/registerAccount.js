const ENDPOINT = 'http://localhost:3001'

export default function registerUser({jwt,userAccount}){
    let jsonUser = JSON.stringify(userAccount)
    return fetch(`${ENDPOINT}/register` , {
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