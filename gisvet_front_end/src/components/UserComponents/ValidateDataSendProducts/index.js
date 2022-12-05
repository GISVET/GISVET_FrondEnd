import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import icon_Product from "./images/Icon_Product.png";
import Loading from "components/GeneralComponents/Loading";
import useAssignmentsUser from "hooks/UserHooks/useAssignmentsUser"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
 

export default function ValidateDataSendProducts({ onSubmit, onClose }) {
  const [data, setData] = useState({
    document: "",
    token_tem: "",
    name_dependecie: "",
  });
  const [readyToSend, isReadyToSend] = useState(false)
  const {dependenciesByDocument} = useAssignmentsUser()
  const [dependenciesToSend, setDependenciesToSend] = useState(null)
  const [lookingforDependencies, setLookingforDependencies] = useState(false)


  const doSubmit = (event) => {
    event.preventDefault();
    onSubmit(data);
  };

  

  const handleChange = (event) => {
    let { name, value } = event.target;
    let newData = { ...data, [name]: value };
    setData(newData);
  };

  const findDocument = () => {
    findFarmaciesUser(data.document)
  };

  const findFarmaciesUser= (document) =>{
    setLookingforDependencies(true)
    dependenciesByDocument(document)
      .then(res=>{
        let response = res.message === undefined?res:null
        setDependenciesToSend(response)
        isReadyToSend(true)
        setLookingforDependencies(false)
      })
  }



  return (
    <div className={styles.form_add_user_general}>
      <div className={styles.title_image}>
        <img src={icon_Product} width="55" height="55" />
        <h1> Confirmación de datos de envio </h1>
      </div>

      <form className={styles.form_add_user} onSubmit={doSubmit}>

        
        <label htmlFor="document">Documento del responsable a recibir </label>
        <div className="p-inputgroup">
            <InputText name="document"
              onChange={handleChange}
              type="text"
              placeholder="Documento destinatario"/>

            <Button 
              label="consultar"
              icon="pi pi-search"
              onClick={findDocument}
            />
          
        </div>
        {lookingforDependencies?
          <Loading></Loading>
          :
          readyToSend?
            dependenciesToSend === null?
            <>
              <p>No se encontró el documento ingresado, verifique la información y vuelva a intentarlo</p>
              <div className={styles.form_horizontal}>
                <input
                  className={styles.button_cancel}
                  type="submit"
                  onClick={onClose}
                  value="Cancelar"
                />
              </div>
            </>
            :<>
              <label htmlFor="token_tem">Token de autorización </label>
              <InputText
                name="token_tem"
                onChange={handleChange}
                required={true}
                type="text"
                placeholder="Ingrese el token de autorización"
              />
              <label htmlFor="name_dependecie">
                  Dependencia a asignar
              </label>

              <Dropdown value={data.name_dependecie} 
                        options={dependenciesToSend} 
                        onChange={handleChange}  
                        optionLabel="DEPENDENCIE_NAME" 
                        optionValue="DEPENDENCIE_NAME"
                        name="name_dependecie"
                        showClear  
                        placeholder="seleccione dependencia"
              />

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
            </>
          :
          <div className={styles.form_horizontal}>
            <input
            className={styles.button_cancel}
            type="submit"
            onClick={onClose}
            value="Cancelar"
           />
          </div>
        }
      
      </form>
    </div>
  );
}
