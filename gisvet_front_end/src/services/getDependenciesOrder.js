import { filtersAscDesc } from "../constants/constants";
const endpoint = process.env.REACT_APP_ENDPOINT


export default function getDependenciesOrder({jwt,order_name}){
    const option = filtersAscDesc.find(element => element.id === order_name);    

    console.log(`El order_name que llega es ${order_name}`)
    const objectName = {"order_name":option.name};
    let jsonName = JSON.stringify(objectName);
    console.log("Entra en el endpoint de ordenar dependencias")
    return fetch(`${endpoint}/Admin/getDependencies` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonName

    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        let data = []
        data = res
        return data
    })
}