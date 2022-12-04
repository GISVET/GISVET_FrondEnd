const endpoint = process.env.REACT_APP_ENDPOINT

export default function getPatientById({ jwt ,id_clinic_history }) {
  console.log(typeof id_clinic_history)
  const objectBody = {
    "id_clinic_history": id_clinic_history
  }

  console.log("El objeto a enviar es")
  console.log(objectBody)
  return fetch(`${endpoint}/Admin/getProductTracing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },body:JSON.stringify(objectBody)
  })
    .then((res) => {
      if (!res.ok) throw new Error("Response is not Ok");
      return res.json();
    })
    .then((res) => {
      let data = [];
      data = res;
      return data;
    });
}