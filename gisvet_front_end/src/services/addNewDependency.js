const endpoint = process.env.REACT_APP_ENDPOINT
export default function addNewDependency({jwt,dependencie_name,type_dependencie}){
    let dependency = {
        dependencie_name:dependencie_name,
        type_dependencie: type_dependencie
    }
    let jsonDependency = JSON.stringify(dependency)
    return fetch(`${endpoint}/Admin/createDependecie`, {
        method: 'POST',
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