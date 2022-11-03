const endpoint = process.env.REACT_APP_ENDPOINT

export default function getDependenciesType({jwt,type_dependencie}){
    const objectName = {"type_dependencie":type_dependencie};
    let jsonName = JSON.stringify(objectName);
    return fetch(`${endpoint}/Admin/getDependencies` , {
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