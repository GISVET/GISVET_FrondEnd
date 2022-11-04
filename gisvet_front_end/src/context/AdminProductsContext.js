import React, { useCallback, useContext, useEffect, useState } from "react";
import userContext from "./UserContext";
import getProductsAdminList from "../services/getProductsAdminList";

import { measurement_units } from "../constants/constants";
import { type_product } from "../constants/constants";

const Context = React.createContext({});

export function formatListProducts(data) {
  let dataFormated = [];
  data[0].products.map((product) => {
    const measurement = measurement_units.find(
      (element) => element.id === product.MEASUREMENT_UNITS
    );
    const type = type_product.find(
      (element) => element.id === product.TYPE_PRODUCT
    );

    let productData = {
      id_product: product.ID_PRODUCT,
      product_name: product.PRODUCT_NAME,
      measurement_units: measurement.name,
      type_product: type.name,
    };
    dataFormated.push(productData);
  });
  return dataFormated;
}

export function AdminProductsContextProvider({ children }) {
  const { jwt } = useContext(userContext);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateProducts, isUpdateProducts] = useState(false);
  let errorMessage = "";

  useEffect(() => {
    setLoading(true);
    getProductsAdminList({ jwt })
      .then((res) => {
        if (res.message === undefined) {
          setLoading(false);
          setProducts(formatListProducts(res));
          isUpdateProducts(false);
        } else {
          setLoading(false);
          errorMessage = res.message;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [updateProducts, jwt]);

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        product,
        setProduct,
        errorMessage,
        loading,
        setLoading,
        formatListProducts,
        isUpdateProducts,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
