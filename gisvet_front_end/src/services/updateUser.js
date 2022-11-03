const endpoint = process.env.REACT_APP_ENDPOINT

export default function updateUser({jwt,data}){
    let jsonUser = JSON.stringify(data)
    console.log(jsonUser)
    return fetch(`${endpoint}/Admin/Users/updatePerson`, {
        method: 'PUT',
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