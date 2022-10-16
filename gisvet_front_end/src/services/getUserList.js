const ENDPOINT = 'http://localhost:3001'

export default function getUserList({jwt}){
    return fetch(`${ENDPOINT}/Admin/persons` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: JSON.stringify({})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        return res
    })
}