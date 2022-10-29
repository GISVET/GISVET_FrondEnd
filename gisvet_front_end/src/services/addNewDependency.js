const ENDPOINT = 'http://localhost:3001'

export default function addNewDependency({jwt,id,name}){
    let dependency = {
        id:full_name,
        name: document_type
    }
    let jsonUser = JSON.stringify(user)
    return fetch(`${ENDPOINT}/Admin/createUser`, {
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