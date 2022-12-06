const endpoint = process.env.REACT_APP_ENDPOINT
export default function getFarmacyProducts({jwt,name_dependencie}){
    const objectName = {
        "type_dependecie": "F",
        "name_dependencie":name_dependencie
    };
    let jsonName = JSON.stringify(objectName);
    let statusRes =0
    return fetch(`${endpoint}/Users/Farmacia/getProducts` , {
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
        let data = []
        if(statusRes !== 200){
            data={
                'message':res.message,
                'status':statusRes
            }
        }else{
            data = res
        }
        return data
    })
}