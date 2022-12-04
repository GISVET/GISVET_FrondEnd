const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewDependency({jwt,dependencie_name,type_dependencie}){
    let dependency = {
        dependencie_name:dependencie_name,
        type_dependencie: type_dependencie
    }
    let jsonDependency = JSON.stringify(dependency)
    let statusRes =0
    return fetch(`${endpoint}/Admin/createDependecie`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonDependency
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