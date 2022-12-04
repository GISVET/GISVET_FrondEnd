import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import icon_Product from "./images/Icon_Product.png";
 
const depAux = [
  {
    "id_dependencie": 4,
    "dependencie_name": "Farmacia",
    "type_dependencie": "F"
  }
]

export default function ValidateDataSendProducts({ onSubmit, onClose }) {
  const [data, setData] = useState({
    document: "",
    token_tem: "",
    name_dependecie: "",
  });

  const [dependencies, setDependencies] = useState(depAux)
  console.log(dependencies)


  const doSubmit = (event) => {
    event.preventDefault();
    onSubmit(data);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    let newData = { ...data, [name]: value };
    setData(newData);
  };



  return (
    <div className={styles.form_add_user_general}>
      <div className={styles.title_image}>
        <img src={icon_Product} width="55" height="55" />
        <h1> Confirmación de datos de envio </h1>
      </div>

      <form className={styles.form_add_user} onSubmit={doSubmit}>

        <label htmlFor="document">Documento del responsable a recibir </label>
        <input
          name="document"
          onChange={handleChange}
          required={true}
          type="text"
          placeholder="Ingrese el numero de documento"
        />

        
        <label htmlFor="token_tem">Token de autorización </label>
        <input
          name="token_tem"
          onChange={handleChange}
          required={true}
          type="text"
          placeholder="Ingrese el token de autorización"
        />
         <label htmlFor="id_dependencie">
            Dependencia a asignar
        </label>
        <select onChange={handleChange} 
                required={true} 
                name="id_dependencie" >

            <option disabled={true} selected></option>
            { dependencies.map(dependencie=>{
                if(dependencie.type_dependencie === "F") {
                  <option  key={dependencie.id_dependencie} value={dependencie.id_dependencie}>
                    {dependencie.dependencie_name}
                  </option>
                }
              })
            }
        </select>

        <div className={styles.form_horizontal}>
          <input
            className={styles.button_accept}
            type="submit"
            value="Agregar"
          />
          <input
            className={styles.button_cancel}
            type="submit"
            onClick={onClose}
            value="Cancelar"
          />
        </div>
      </form>
    </div>
  );
}
