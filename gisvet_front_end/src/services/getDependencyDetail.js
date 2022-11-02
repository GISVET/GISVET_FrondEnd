const ENDPOINT = 'http://localhost:3001'

export default function getDependencyDetails({jwt,id_dependencie}){
    console.log(`El id que llega al endpoint es ${id_dependencie}`)
    const objectName = {"id_dependencie":parseInt(id_dependencie)};
    let jsonName = JSON.stringify(objectName);
    console.log("Entra en el endpoint de buscar dependencia por id")
    return fetch(`${ENDPOINT}/Admin/getIdDependencies` , {
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