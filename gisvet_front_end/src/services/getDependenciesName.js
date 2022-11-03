const endpoint = process.env.REACT_APP_ENDPOINT
export default function getDependenciesName({jwt,dependencie_name}){
    const objectName = {"dependencie_name":dependencie_name};
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