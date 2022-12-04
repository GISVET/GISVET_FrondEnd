const endpoint = process.env.REACT_APP_ENDPOINT

export default async function registerUser({jwt,userAccount}){
    let jsonUser = JSON.stringify(userAccount)
    const res = await fetch(`${endpoint}/register`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer ' + jwt
        },
        body: jsonUser
    })
    if (!res.ok)
        throw new Error('Response is not Ok')
    const res_1 = await res.json()
    return res_1.message
}