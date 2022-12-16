import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import icon_Product from "./images/Icon_Product.png";
import Loading from "components/GeneralComponents/Loading";
import { RadioButton } from 'primereact/radiobutton';
import { destiny_end_product } from "constants/constants";
import { Calendar } from 'primereact/calendar';
 

export default function ValidateDataApplyProducts({ onSubmit, onClose }) {
  const [data, setData] = useState({
    "destiny_service": "",
    "date_product_tracing": "",
  });

  const doSubmit = (event) => {
    event.preventDefault();
    const regex = /\//g
    const date =(data.date_product_tracing.toLocaleDateString()).replace(regex,"-")
    const time = (`${data.date_product_tracing.getHours()}:${data.date_product_tracing.getMinutes()}:${data.date_product_tracing.getSeconds()}`)
    data.date_product_tracing = (`${date} ${time}`)
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
        <img src={icon_Product} alt="Products" width="55" height="55" />
        <h1> Confirmación de datos para asignación a paciente </h1>
      </div>
      
        <form className={styles.form_add_user} onSubmit={doSubmit}>

        <div className="card">
            <h5>Seleccione el destino de los productos</h5>
            
            <div className="field-radiobutton" >
              <RadioButton inputId="destiny_id"
                         name="destiny_service" 
                         value={destiny_end_product[0].id} 
                         onChange={handleChange} 
                         required={true}
                         checked={data.destiny_service === destiny_end_product[0].id} />
              <label htmlFor="destiny_id">{destiny_end_product[0].name}</label>
            </div>
            <div className="field-radiobutton" >
              <RadioButton inputId="destiny_id"
                         name="destiny_service" 
                         value={destiny_end_product[1].id} 
                         onChange={handleChange} 
                         required={true}
                         checked={data.destiny_service === destiny_end_product[1].id} />
              <label htmlFor="destiny_id">{destiny_end_product[1].name}</label>
            </div>
            <div className="field-radiobutton" >
              <RadioButton inputId="destiny_id"
                         name="destiny_service" 
                         value={destiny_end_product[2].id} 
                         onChange={handleChange}
                         required={true}
                         checked={data.destiny_service === destiny_end_product[2].id} />
              <label htmlFor="destiny_id">{destiny_end_product[2].name}</label>
            </div>
        </div>
        <div className="field col-12 ">
            <label htmlFor="time24">Seleccione fecha de assignación</label>
            <Calendar name="date_product_tracing"
                      id="time24" 
                      value={data.date_product_tracing} 
                      onChange={handleChange} 
                      showTime 
                      showSeconds 
                      required={true}/>
        </div>

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
