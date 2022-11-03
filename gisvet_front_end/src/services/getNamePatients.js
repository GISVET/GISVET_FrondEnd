const endpoint = process.env.REACT_APP_ENDPOINT

export default function getNamePatients({jwt,name_patient}){
    console.log(`El name que llega es ${name_patient}`)
    const objectName = {"name_patient":name_patient};
    let jsonName = JSON.stringify(objectName);
    return fetch(`${endpoint}/Admin/getNamePatient` , {
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