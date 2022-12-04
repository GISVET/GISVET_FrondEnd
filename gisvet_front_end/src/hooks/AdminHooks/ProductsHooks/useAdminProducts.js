//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import adminProductsContext from "context/AdminContext/AdminProductsContext";

//=====Importaciones de constantes ====
import { productsAdmin } from "constants/headersTables";

//=====Importaciones de servicios ====
import addNewMark from "services/AdminServices/ProductsServices/addNewMark";
import addNewLote from "services/AdminServices/ProductsServices/addNewLote";
import addNewProduct from "services/AdminServices/ProductsServices/addNewProduct";
import addNewItem from "services/AdminServices/ProductsServices/addNewItem";

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
