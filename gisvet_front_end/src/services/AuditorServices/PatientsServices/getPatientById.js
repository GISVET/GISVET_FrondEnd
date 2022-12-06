const endpoint = process.env.REACT_APP_ENDPOINT

export default function getPatientById({ jwt ,id_clinic_history }) {
  const objectBody = {
    "id_clinic_history": parseInt(id_clinic_history)
  }
  let status
  return fetch(`${endpoint}/Auditor/getProductTracing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },body:JSON.stringify(objectBody)
  })
    .then((res) => {
      status= res.status
      return res.json();
    })
    .then((res) => {
      let data = [];
      if (status !== 200) {
        res["status"]= status
      }
      data = res;
      return data;
    });
}
