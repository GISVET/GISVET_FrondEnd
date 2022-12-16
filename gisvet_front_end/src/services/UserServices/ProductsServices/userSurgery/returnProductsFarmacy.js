const endpoint = process.env.REACT_APP_ENDPOINT
export default function returnProductsFarmacy({jwt,document,token_tem,name_dependecie, dataProducts}){

    let bodySend = {
        "document": document,
        "token_tem": token_tem,
        "name_dependecie": name_dependecie,
        "products":dataProducts,
    }
    let jsonProduct = JSON.stringify(bodySend)
    let statusRes =0
    return fetch(`${endpoint}/Users/Consultorio/returnProducts`, {
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