const ENDPOINT = 'http://localhost:3001'

export default function login({username,password}){
    return fetch(`${ENDPOINT}/login` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({email:username,password_account:password})
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        return res
    })
}