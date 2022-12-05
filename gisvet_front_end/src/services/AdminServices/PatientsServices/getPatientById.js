const endpoint = process.env.REACT_APP_ENDPOINT

export default function getPatientById({ jwt ,id_clinic_history }) {
  const objectBody = {
    "id_clinic_history": parseInt(id_clinic_history) 
  }
  let status
  return fetch(`${endpoint}/Admin/getProductTracing`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },body:JSON.stringify(objectBody)
    })
    .then((res) => {
      if (res.status !== 200){
        status=res.status
      }
      return res.json();
    })
    .then((res) => {
      let data = [];
      data = res;
      return data;
    });
}
