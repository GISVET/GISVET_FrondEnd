const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewMark({jwt,id_brand,name_brand}){
    let mark = {
        id_brand:parseInt(id_brand),
        name_brand: name_brand
    }
    let jsonMark = JSON.stringify(mark)
    return fetch(`${endpoint}/Admin/Item/createBrand`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonMark
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        return res.message
    })
}