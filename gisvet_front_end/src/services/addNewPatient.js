const ENDPOINT = 'http://localhost:3001'

export default function addNewPatient({jwt,id_clinic_history,name_patient}){
    let patient = {
        id_clinic_history:id_clinic_history,
        name_patient: name_patient
    }
    let jsonUser = JSON.stringify(patient)
    return fetch(`${ENDPOINT}/Admin/getPatient`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonUser
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        return res.message
    })
}