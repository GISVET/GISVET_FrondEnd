const endpoint = process.env.REACT_APP_ENDPOINT

export default function generateToken({jwt,idUser}){
    const objectName = {
        "id_person":parseInt(idUser)
    };
    let jsonName = JSON.stringify(objectName);
    let statusRes =0
    return fetch(`${endpoint}/Users/Farmacia/generateToken` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonName

    }).then(res => {
        statusRes = res.status
        return res.json()
    }).then(res => {
        let data={
            'message':res.message,
            'status':statusRes
        }
        return data
    })
}