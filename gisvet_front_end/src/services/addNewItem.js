const endpoint = process.env.REACT_APP_ENDPOINT

export default function addNewItem({jwt,data}){
    const dataAux ={
        'presentation':data.presentation,
        'quantity':parseInt(data.quantity),
        'id_product':parseInt(data.id_product),
        'id_dependencie':parseInt(data.id_dependencie),
        'id_brand':parseInt(data.id_brand),
  		'expiration_date' : data.expiration_date,
    	'quantity_per_unit': parseInt(data.quantity_per_unit),
    	'price_per_unit': parseInt(data.price_per_unit),
  		'invima': data.invima,
    	'manufacturing_date': data.manufacturing_date,
    }

    let jsonUser = JSON.stringify(dataAux)
    let statusRes =0
    return fetch(`${endpoint}/Admin/Item/assingItem`, {
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