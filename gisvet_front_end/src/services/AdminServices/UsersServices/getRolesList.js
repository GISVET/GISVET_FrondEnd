const endpoint = process.env.REACT_APP_ENDPOINT
export default function getRolesList({jwt}){
    return fetch(`${endpoint}/Admin/Users/getRoles` , {
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