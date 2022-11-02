const ENDPOINT = 'http://localhost:3001'

export default function updateDependency({jwt,id_dependencie,dependencie_name}){
    console.log(`Llega el id ${id_dependencie}  y el name ${dependencie_name}`)
    let dependency = {
        id_dependencie: parseInt(id_dependencie),
        dependencie_name:dependencie_name
        }
    let jsonDependency = JSON.stringify(dependency)
    return fetch(`${ENDPOINT}/Admin/updateDependecie`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonDependency
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        return res.message
    })
}