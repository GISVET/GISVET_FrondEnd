const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewMark({jwt,id_product,product_name,measurement_units,type_product}){
    console.log(id_product)

    let product = {
        id_product:parseInt(id_product),
        product_name: product_name,
        measurement_units:measurement_units,
        type_product:type_product
    }
    let jsonProduct = JSON.stringify(product)
    console.log("El JSON product es : ")
    console.log(jsonProduct)
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