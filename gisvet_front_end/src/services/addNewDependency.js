const ENDPOINT = 'http://localhost:3001'

export default function addNewDependency({jwt,id,name,role}){
    let dependency = {
        full_name:full_name,
        document_type: document_type,
        document:document,
        gender:gender,
        professional_id: professional_id,
        id_department: new Number(id_department)
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