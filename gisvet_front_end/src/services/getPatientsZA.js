const endpoint = process.env.REACT_APP_ENDPOINT

export default function getPatientsZA({jwt}){
    return fetch(`${endpoint}/Admin/getPatientsOrderZA` , {
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