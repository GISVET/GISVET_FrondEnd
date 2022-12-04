const endpoint = process.env.REACT_APP_ENDPOINT

export default function login({username,password}){
    console.log(endpoint)
    return fetch(`${endpoint}/login` , {
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