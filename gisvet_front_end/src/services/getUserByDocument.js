const ENDPOINT = 'http://localhost:3001'
const ejem={

    "ID_PERSON": 1,
    "FULL_NAME": "Raúl Santiago valencia Cortés",
    "DOCUMENT_TYPE": "CC",
    "DOCUMENT": "2131231",
    "GENDER": "M",
    "STATE": "A",
    "PROFESSIONAL_ID": "2313123",
    "user_depepndencies": [
        {
          "ID_ROL": 1,
          "ID_DEPENDENCIE": 1,
          "DEPARTMENT_NAME": "Consultorio 1",
          "STATE": "A"
        },
        {
          "ID_ROL": 2,
          "ID_PERSON": 1,
          "DEPARTMENT_NAME": "Consultorio 1",
          "STATE": "A"
        }],
    "user_roles": [
      {
        "ID_ROL": 1,
        "ID_PERSON": 1,
        "STATE": "A"
      },
      {
        "ID_ROL": 2,
        "ID_PERSON": 1,
        "STATE": "A"
      }
    ]
}
export default function getUsersByDocument({jwt, id_user}){
    /*return fetch(`${ENDPOINT}/Admin/Users/persons` , {
        method: 'GET',
        headers: {
            //"Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        }
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        let data = []
        data = res
        return data
    })*/
    return ejem
}