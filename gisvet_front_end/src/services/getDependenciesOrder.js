import { filtersAscDesc } from "../constants/constants";

const ENDPOINT = 'http://localhost:3001'


export default function getDependenciesOrder({jwt,order_name}){
    const option = filtersAscDesc.find(element => element.id === order_name);    

    console.log(`El order_name que llega es ${order_name}`)
    const objectName = {"order_name":option.name};
    let jsonName = JSON.stringify(objectName);
    console.log("Entra en el endpoint de ordenar dependencias")
    return fetch(`${ENDPOINT}/Admin/getDependencies` , {
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