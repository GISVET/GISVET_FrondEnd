import { useContext, useCallback, useState } from "react";
import userContext from "../context/UserContext";
import adminProductsContext, { formatListProducts } from "../context/AdminProductsContext";
import { productsAdmin } from "../constants/headersTables";
import addNewMark from "../services/addNewMark";
import addNewLote from "../services/addNewLote";
import addNewProduct from "../services/addNewProduct";



import getDependenciesName from "../services/getDependenciesName";
import getDependenciesOrder from "../services/getDependenciesOrder";
import getDependenciesType from "../services/getDependenciesType";
import getDependencyDetails from "../services/getDependencyDetail";


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
  } = useContext(adminProductsContext);
  let errorMessage = "";

  const addMark = useCallback(
    ({ id_brand, name_brand }) => {
      setLoading(true);
      addNewMark({ jwt, id_brand, name_brand })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateProducts(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const addProduct = useCallback(
    ({ id_product,product_name,measurement_units,type_product }) => {
      setLoading(true);
      addNewProduct({ jwt, id_product,product_name,measurement_units,type_product })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateProducts(true);
          }
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
      addNewLote({ jwt, expiration_date,quantity_per_unit,price_per_unit,invima,manufacturing_date})
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateProducts(true);
          }
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

  const askDependency = useCallback(
    (dependencie_name) => {
      setLoading(true);
      getDependencyDetails({ jwt, dependencie_name })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setDependency(res);
          }
        })
        .catch((err) => {
        });
    },
    [setLoading]
  );

  const askDependencyName = useCallback(
    (dependencie_name) => {
      setLoading(true);
      getDependenciesName({ jwt, dependencie_name })
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

  return {
    loading,
    setLoading,
    products,
    dependency,
    isUpdateProducts,
    headers: productsAdmin,
    addMark,
    addLote,
    addProduct,
    orderDependency,
    askDependencyName,
    askDependencyType,
    askDependency,
  };
}
