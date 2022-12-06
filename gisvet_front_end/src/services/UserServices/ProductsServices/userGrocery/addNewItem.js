const endpoint = process.env.REACT_APP_ENDPOINT

export default function addNewItem({jwt,data}){
    const dataAux ={
        "product_name": data.product_name,
  		"measurement_units": data.measurement_units,
  		"type_product": data.type_product,
  		"expiration_date" : data.expiration_date,
    	"quantity_per_unit": parseInt(data.quantity_per_unit),
    	"price_per_unit": parseInt(data.price),
  		"invima": data.invima,
    	"manufacturing_date": data.manufacturing_date,
  		"presentation": data.presentation,
  		"quantity": parseInt(data.quantity),
  		"id_dependencie": parseInt(data.id_dependencie),
  		"iup": data.iup,
  		"name_brand": data.name_brand,
    }

    let jsonUser = JSON.stringify(dataAux)
    let statusRes =0
    return fetch(`${endpoint}/Users/Bodega/createItem`, {
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