const endpoint = process.env.REACT_APP_ENDPOINT
export default function assignDependecieUser({jwt,id_dependencie,id_person}){
    let statusRes =0

    console.log("Esta llegando los ids")
    console.log(id_dependencie)
    console.log(id_person)

    let features = {
        id_dependencie:parseInt(id_dependencie),
        id_person: parseInt(id_person)
    }

    let jsonFeatures = JSON.stringify(features)


    console.log(`Esto llego al service ${id_dependencie} y el ${id_person}`)
    return fetch(`${endpoint}/Admin/createDependencieUser` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonFeatures
    }).then(res => {
        statusRes = res.status
        return res.json()
    }).then(res => {
        const resAux={
            'message':res.message,
            'status':statusRes
        }
        return resAux
    })
}