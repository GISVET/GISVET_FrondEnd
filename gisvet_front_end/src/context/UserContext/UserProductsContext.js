import React, { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { measurement_units } from "constants/constants";
import { type_product } from "constants/constants";
import getBranchList from "services/UserServices/ProductsServices/getBranchList";
import getProductsList from "services/UserServices/ProductsServices/getProductsList";

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
      total_product: product.TOTAL_PRODUCT,
    };
    
    dataFormated.push(productData);
  });
  return dataFormated;
}

export function formatListBranches(data) {
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
      total_product: product.TOTAL_PRODUCT,
    };
    dataFormated.push(productData);
  });
  return dataFormated;
}



export function UserProductsContextProvider({ children }) {
  const { jwt } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateProducts, isUpdateProducts] = useState(false);
  const [updateBranches, isUpdateBranches] = useState(false);



  useEffect(() => {
    setLoading(true);
    getProductsList({ jwt })
      .then((res) => {
        if (res.message === undefined) {
          setLoading(false);
          setProducts(res);
          isUpdateProducts(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [updateProducts, jwt]);

  useEffect(() => {
    setLoading(true);
    getBranchList({ jwt })
      .then((res) => {
        if (res.message === undefined) {
          setLoading(false);
          setBrands(res);
          isUpdateBranches(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [updateBranches, jwt]);



  return (
    <Context.Provider
      value={{
        products,
        brands,
        loading,
        setLoading,
        formatListProducts,
        isUpdateProducts,
        isUpdateBranches,
        updateBranches
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
