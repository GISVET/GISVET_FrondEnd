const endpoint = process.env.REACT_APP_ENDPOINT

export default function addNewUser({jwt,data}){
    let jsonUser = JSON.stringify(data)
    return fetch(`${endpoint}/Admin/Users/createPersonAll`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonUser
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        const jsonResponse={
            'message':res.json(),
            'status' :res.status
        }
        return jsonResponse
    })
}