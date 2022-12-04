const endpoint = process.env.REACT_APP_ENDPOINT

export default function updateDependency({jwt,id_dependencie,dependencie_name}){
    console.log(`Llega el id ${id_dependencie}  y el name ${dependencie_name}`)
    let dependency = {
        id_dependencie: parseInt(id_dependencie),
        dependencie_name:dependencie_name
        }
    let jsonDependency = JSON.stringify(dependency)
    let statusRes =0
    return fetch(`${endpoint}/Admin/updateDependecie`, {
        method: 'PUT',
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