
const endpoint = process.env.REACT_APP_ENDPOINT

export default function getUsersListName({jwt, username}){
    const useAux = {
        'name_person':username
    }
    return fetch(`${endpoint}/Auditor/Users/persons` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: JSON.stringify(useAux)
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        let data = []
        data = res
        return data
    })
}