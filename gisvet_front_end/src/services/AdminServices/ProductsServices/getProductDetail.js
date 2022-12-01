const endpoint = process.env.REACT_APP_ENDPOINT;
export default function getProductDetail({ jwt, id_product, presentation }) {
  console.log(`El id que llega al endpoint es ${id_product}`);
  console.log(`La presentación que llega al endpoint es ${presentation}`);

  const objectName = {
    id_product: parseInt(id_product),
    presentation: presentation,
  };
  let jsonName = JSON.stringify(objectName);
  console.log("Entra en el endpoint de buscar producto por id");
  return fetch(`${endpoint}/Admin/Item/getSpecificProduct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: jsonName,
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
