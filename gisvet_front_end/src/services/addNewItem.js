const endpoint = process.env.REACT_APP_ENDPOINT

export default function addNewItem({jwt,data}){
    const dataAux ={
        'presentation':data.presentation,
        'quantity':parseInt(data.quantity),
        'id_product':parseInt(data.id_product),
        'id_feature':parseInt(data.id_feature), 
        'id_dependencie':parseInt(data.id_dependencie),
        'id_brand':parseInt(data.id_brand)
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