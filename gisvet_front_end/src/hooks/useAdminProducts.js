import { useContext, useCallback, useState } from "react";
import userContext from "context/UserContext";
import adminProductsContext, { formatListProducts } from "context/AdminProductsContext";
import { productsAdmin } from "constants/headersTables";
import addNewMark from "services/addNewMark";
import addNewLote from "services/addNewLote";
import addNewProduct from "services/addNewProduct";
import addNewItem from "services/addNewItem";
import getDependenciesName from "services/getDependenciesName";
import getDependenciesOrder from "services/getDependenciesOrder";
import getDependenciesType from "services/getDependenciesType";
import getDependencyDetails from "services/getDependencyDetail";
import getProductsName from "services/getProductsName";


export function useAdminProducts() {
  const { jwt } = useContext(userContext);
  const {
    dependency,
    setDependency,
    products,
    setProducts,
    formatListDependencies,
    loading,
    setLoading,
    isUpdateProducts,
    isUpdateBranches,
    isUpdateFeatures,
  } = useContext(adminProductsContext);
  let errorMessage = "";

  const addMark = useCallback(
    ({  name_brand }) => {
      setLoading(true);
      return addNewMark({ jwt,  name_brand })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateBranches(true);
          }
          return res
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const addProduct = useCallback(
    ({ product_name,measurement_units,type_product }) => {
      setLoading(true);
      return addNewProduct({ jwt,product_name,measurement_units,type_product })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateProducts(true);
          }
          return res
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const askProductName = useCallback(
    (value) => {
      setLoading(true);
      getProductsName({ jwt, value })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setProducts(formatListProducts(res));
          }
        })
        .catch((err) => {
          setProducts([]);
        });
    },
    [setLoading]
  );


  const addItem = useCallback((data) => {
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
          return res
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const addLote= useCallback(
    ({ expiration_date,quantity_per_unit,price_per_unit,invima,manufacturing_date}) => {
      setLoading(true);
      return addNewLote({ jwt, expiration_date,quantity_per_unit,price_per_unit,invima,manufacturing_date})
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateFeatures(true);
          }
          return res
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );



  const orderDependency = useCallback(
    (order_name) => {
      setLoading(true);
      getDependenciesOrder({ jwt, order_name })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setProducts(formatListDependencies(res));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const askDependencyType = useCallback(
    (type_dependencie) => {
      setLoading(true);
      setLoading(true);
      getDependenciesType({ jwt, type_dependencie })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setProducts(formatListProducts(res));
          }
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
    orderDependency,
    askProductName,
    askDependencyType,
  };
}
