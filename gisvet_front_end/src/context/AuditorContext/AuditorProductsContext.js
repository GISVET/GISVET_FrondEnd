//=====Importaciones de React ====
import React, { useCallback, useContext, useEffect, useState } from "react";

//=====Importaciones de servicios ====
import getProductsAdminList from "services/AuditorServices/ProductsServices/getProductsAdminList";
import getBranchList from "services/AuditorServices/ProductsServices/getBranchList";
import getFeaturesList from "services/AuditorServices/ProductsServices/getFeaturesList";

//=====Importaciones de contextos ====
import UserContext from "../UserContext/UserContext"

//=====Importaciones de constantes ====
import { measurement_units } from "constants/constants";
import { type_product } from "constants/constants";
import { presentations } from "constants/constants";


const Context = React.createContext({});

export function formatListProducts(data) {
  let dataFormated = [];
  data.map((product) => {
    const measurement = measurement_units.find(
      (element) => element.id === product.MEASUREMENT_UNITS
    );

    const presentation_data = presentations.find(
      (element) => element.id === product.PRESENTATION
    );
    const type = type_product.find(
      (element) => element.id === product.TYPE_PRODUCT
    );

    let productData = {
      id_product: product.ID_PRODUCT,
      product_name: product.PRODUCT_NAME,
      presentation: presentation_data.name,
      measurement_units: measurement.name,
      type_product: type.name,
      quantity: product.TOTAL_PRODUCT,
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

export function formatListFeatures(data) {
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

export function AuditorProductsContextProvider({ children }) {
  const { jwt } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateProducts, isUpdateProducts] = useState(false);
  const [updateBranches, isUpdateBranches] = useState(false);
  const [updateFeatures, isUpdateFeatures] = useState(false);
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
          errorMessage = res.message;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [updateBranches, jwt]);

  useEffect(() => {
    setLoading(true);
    getFeaturesList({ jwt })
      .then((res) => {
        if (res.message === undefined) {
          setLoading(false);
          setFeatures(res);
          isUpdateFeatures(false);
        } else {
          setLoading(false);
          errorMessage = res.message;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [updateFeatures, jwt]);


  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        brands,
        setBrands,
        features, 
        setFeatures,
        product,
        setProduct,
        errorMessage,
        loading,
        setLoading,
        formatListProducts,
        isUpdateProducts,
        isUpdateBranches,
        isUpdateFeatures,
        updateFeatures,
        updateBranches
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
