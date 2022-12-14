const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewMark({jwt,product_name,measurement_units,type_product}){

    let product = {
        product_name: product_name,
        measurement_units:measurement_units,
        type_product:type_product
    }
    let jsonProduct = JSON.stringify(product)
    let statusRes =0
    return fetch(`${endpoint}/Admin/Item/createProducts`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonProduct
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