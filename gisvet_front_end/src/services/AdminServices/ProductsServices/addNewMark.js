const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewMark({jwt,name_brand}){
    let mark = {
        name_brand: name_brand
    }
    let jsonMark = JSON.stringify(mark)
    let statusRes =0
    return fetch(`${endpoint}/Admin/Item/createBrand`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonMark
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