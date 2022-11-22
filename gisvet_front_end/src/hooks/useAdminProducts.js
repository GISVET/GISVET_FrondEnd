import { useContext, useCallback, useState } from "react";
import userContext from "context/UserContext";
import adminProductsContext from "context/AdminProductsContext";
import { productsAdmin } from "constants/headersTables";
import addNewMark from "services/addNewMark";
import addNewLote from "services/addNewLote";
import addNewProduct from "services/addNewProduct";
import addNewItem from "services/addNewItem";

export function useAdminProducts() {
  const { jwt } = useContext(userContext);
  const {
    dependency,
    products,
    loading,
    setLoading,
    isUpdateProducts,
    isUpdateBranches,
    isUpdateFeatures,
  } = useContext(adminProductsContext);
  let errorMessage = "";

  console.log("Los productos que llegan al use")
  console.log(products)

  const addMark = useCallback(
    ({ name_brand }) => {
      setLoading(true);
      return addNewMark({ jwt, name_brand })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateBranches(true);
          }
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const addProduct = useCallback(
    ({ product_name, measurement_units, type_product }) => {
      setLoading(true);
      return addNewProduct({
        jwt,
        product_name,
        measurement_units,
        type_product,
      })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateProducts(true);
          }
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const addItem = useCallback(
    (data) => {
      setLoading(true);
      return addNewItem({ jwt, data })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateFeatures(true);
          }
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const addLote = useCallback(
    ({
      expiration_date,
      quantity_per_unit,
      price_per_unit,
      invima,
      manufacturing_date,
    }) => {
      setLoading(true);
      return addNewLote({
        jwt,
        expiration_date,
        quantity_per_unit,
        price_per_unit,
        invima,
        manufacturing_date,
      })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateFeatures(true);
          }
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  return {
    loading,
    setLoading,
    products,
    dependency,
    isUpdateProducts,
    headers: productsAdmin,
    addMark,
    addItem,
    addLote,
    addProduct,
  };
}
