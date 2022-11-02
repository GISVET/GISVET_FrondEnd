const ENDPOINT = 'http://localhost:3001'

export default function getUsersByDocument({jwt, document}){
  const objectBody = {
    "document": document
  }
    return fetch(`${ENDPOINT}/Admin/Users/personsId` , {
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