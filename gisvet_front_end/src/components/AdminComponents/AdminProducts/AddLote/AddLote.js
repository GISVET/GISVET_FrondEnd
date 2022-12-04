//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de imagenes ====
import icon_Add_Lote from "./images/Icon_Lote.png";

export default function AddLote({ onSubmit, onClose }) {
  const [data, setData] = useState({
    expiration_date: "",
    quantity_per_unit: "",
    price_per_unit: "",
    invima: "",
    manufacturing_date: "",
  });

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
        <img src={icon_Add_Lote} width="55" height="55" />
        <h1> Registro de Lote </h1>
      </div>

      <form className={styles.form_add_user} onSubmit={doSubmit}>
        <label htmlFor="invima">Registro del Producto (INVIMA,ICA...) </label>
        <input
          name="invima"
          onChange={handleChange}
          required={true}
          type="number"
          placeholder="Digite el registro del lote"
        />

        <label htmlFor="price_per_unit">Precio por unidad de medida </label>
        <input
          name="price_per_unit"
          onChange={handleChange}
          required={true}
          type="number"
          placeholder="Ingrese el precio por unidad de producto"
        />

        <label htmlFor="quantity_per_unit">
          Cantidad por unidad de medida{" "}
        </label>
        <input
          name="quantity_per_unit"
          onChange={handleChange}
          required={true}
          type="number"
          placeholder="Ingrese la cantidad por unidad de medida"
        />

        <label htmlFor="manufacturing_date">Fecha de manufactura</label>
        <input
          name="manufacturing_date"
          onChange={handleChange}
          required={true}
          type="date"
          placeholder="Ingrese la fecha de manufactura del producto"
        />

        <label htmlFor="expiration_date">Fecha de vencimiento</label>
        <input
          name="expiration_date"
          onChange={handleChange}
          required={true}
          type="date"
          placeholder="Ingrese la fecha de vencimiento del lote"
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
      </form>
    </div>
  );
}
