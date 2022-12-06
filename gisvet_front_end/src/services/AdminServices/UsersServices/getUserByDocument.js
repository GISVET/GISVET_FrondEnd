const endpoint = process.env.REACT_APP_ENDPOINT

export default function getUsersByDocument({jwt, document}){
    console.log("El document que llega al endpoint es ")
    console.log(document)
  const objectBody = {
    "document": document
  }
    return fetch(`${endpoint}/Admin/Users/personsId` , {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer '+jwt
        }, body:JSON.stringify(objectBody)
    }).then(res => {
        if (!res.ok) throw new Error('Response is not Ok')
        return res.json()
    }).then(res => {
        let data = []
        data = res
        return data
    })
}

