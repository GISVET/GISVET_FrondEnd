const endpoint = process.env.REACT_APP_ENDPOINT

export default function assignProductsToPatient({jwt,data}){
    const dataAux ={
        "id_clinic_history": parseInt(data.id_clinic_history),
  		"destiny_service": data.destiny_service,
  		"date_product_tracing": data.date_product_tracing,
  		"id_person" : parseInt(data.id_person),
    	"products": data.products
    }

    let jsonUser = JSON.stringify(dataAux)
    let statusRes =0
    return fetch(`${endpoint}/Users/Consultorio/createProductTracing`, {
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
        if (statusRes ===200) {
            const resAux={
                'message':'Productos asignados exitosamente',
                'status':statusRes
            }
        }
        const resAux={
            'message':res.message,
            'status':statusRes
        }
        return resAux
    })
}