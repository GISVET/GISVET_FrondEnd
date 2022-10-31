const ENDPOINT = 'http://localhost:3001'

export default function getDependenciesList({jwt}){
    console.log("Entra en el endpoint de obtener dependencias")
    return fetch(`${ENDPOINT}/Admin/getDependencies` , {
        method: 'POST',
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