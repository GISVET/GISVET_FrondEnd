const endpoint = process.env.REACT_APP_ENDPOINT


export default function changeRol({jwt, name_rol}){
    const objectName = {"name_rol":name_rol};
    let jsonName = JSON.stringify(objectName);
    return fetch(`${endpoint}/changeRol` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonName
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        let data = []
        data = res
        return data
    })
}