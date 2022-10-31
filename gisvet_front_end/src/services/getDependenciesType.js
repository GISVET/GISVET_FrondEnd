const ENDPOINT = 'http://localhost:3001'

export default function getDependenciesType({jwt,type_dependencie}){
    const objectName = {"type_dependencie":type_dependencie};
    let jsonName = JSON.stringify(objectName);
    console.log("Entra en el endpoint de ordenar dependencias")
    return fetch(`${ENDPOINT}/Admin/getDependencies` , {
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