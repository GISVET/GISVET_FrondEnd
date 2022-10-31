const ENDPOINT = 'http://localhost:3001'

export default function getPatientsAZ({jwt}){
    return fetch(`${ENDPOINT}/Admin/getPatientsOrderAZ` , {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
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