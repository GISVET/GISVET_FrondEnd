const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewPatient({jwt,id_clinic_history,name_patient}){
    let patient = {
        id_clinic_history:parseInt(id_clinic_history),
        name_patient: name_patient
    }
    let jsonUser = JSON.stringify(patient)
    let statusRes =0
    return fetch(`${endpoint}/Admin/createPatient`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonUser
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