const ENDPOINT = 'http://localhost:3001'

export default function getRolesList({jwt}){
    return fetch(`${ENDPOINT}/Admin/getRoles` , {
        method: 'GET',
        headers: {
            "Authorization": 'Bearer '+jwt
        }
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        let data = []
        data = res
        return data
    })
}