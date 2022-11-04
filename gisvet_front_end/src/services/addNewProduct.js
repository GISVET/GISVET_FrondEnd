const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewMark({jwt,id_product,product_name,measurement_units,type_product}){
    console.log(id_product)

    let product = {
        id_product:parseInt(id_product),
        product_name: product_name,
        measurement_units:measurement_units,
        type_product:type_product
    }
    console.log("El producto que llega al endpoint es")
    console.log(product)
    let jsonProduct = JSON.stringify(product)
    console.log("El JSON product es : ")
    console.log(jsonProduct)
    return fetch(`${endpoint}/Admin/Item/createProducts`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonProduct
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        console.log("El mensaje que arroja el endpoint es")
        console.log(res.message)
        return res.message
    })
}