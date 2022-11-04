const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewLote({jwt,expiration_date,quantity_per_unit,price_per_unit,invima,manufacturing_date}){
    let features = {
        expiration_date:expiration_date,
        quantity_per_unit: parseInt(quantity_per_unit),
        price_per_unit:parseInt(price_per_unit),
        invima:invima,
        manufacturing_date:manufacturing_date
    }
    console.log(features)
    let statusRes =0
    let jsonFeatures = JSON.stringify(features)
    return fetch(`${endpoint}/Admin/Item/createFeatureProducts`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonFeatures
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