import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import icon_Product from "./images/Icon_Product.png";
import { type_product } from "constants/constants";

import { measurement_units } from "constants/constants";


export default function addProduct({ onSubmit, onClose }) {
  const [data, setData] = useState({
    product_name: "",
    measurement_units: "",
    type_product: "",
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

  const handleTypeProduct = (event)=>{
    let {name, value} = event.target;
    let newData = {...data, [name]: value}
    setData(newData);
}

  return (
    <div className={styles.form_add_user_general}>
      <div className={styles.title_image}>
        <img src={icon_Product} width="55" height="55" />
        <h1> Agregar Producto </h1>
      </div>

      <form className={styles.form_add_user} onSubmit={doSubmit}>

        <label htmlFor="product_name">Nombre del producto</label>
        <input
          name="product_name"
          onChange={handleChange}
          required={true}
          type="text"
          placeholder="Ingrese el nombre del producto"
        />

        <label htmlFor="type_product">Tipo de Producto</label>
        <select
          className={styles.typeDependencieSelect}
          onChange={handleTypeProduct}
          required={true}
          name="type_product"
        >
          <option disabled={true} selected></option>
          {type_product.map((typeProduct) => (
            <option key={typeProduct.id} value={typeProduct.id}>
              {typeProduct.name}
            </option>
          ))}
        </select>

        <label htmlFor="measurement_units">Unidad de medida </label>
        <select
          className={styles.typeDependencieSelect}
          onChange={handleTypeProduct}
          required={true}
          name="measurement_units"
        >
          <option disabled={true} selected></option>
          {measurement_units.map((measure) => (
            <option key={measure.id} value={measure.id}>
              {measure.name}
            </option>
          ))}
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
