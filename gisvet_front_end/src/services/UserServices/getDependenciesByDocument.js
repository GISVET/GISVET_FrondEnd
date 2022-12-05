const endpoint = process.env.REACT_APP_ENDPOINT


export default function getDependenciesByDocument({jwt,document}){
    const objectName = {"document":document};
    let jsonName = JSON.stringify(objectName);
    let statusRes =0
    return fetch(`${endpoint}/Users/getDependeciePersons` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        },
        body: jsonName

    }).then(res => {
        statusRes = res.status
        return res.json()
    }).then(res => {
        let data = []
        if(statusRes !== 200){
            data={
                'message':res.message,
                'status':statusRes
            }
        }else{
            data = res
        }
        return data
    })
}