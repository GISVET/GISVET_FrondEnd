const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewPatient({jwt,id_clinic_history,name_patient}){
    let patient = {
        id_clinic_history:parseInt(id_clinic_history),
        name_patient: name_patient
    }
    let jsonUser = JSON.stringify(patient)
    return fetch(`${endpoint}/Admin/createPatient`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonUser
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        const resAux={
            'message' : res.json(),
            'status' :res.status
        }
        return resAux
    }).then(res => {
        res.message = res.message.message
        return res
    })
}