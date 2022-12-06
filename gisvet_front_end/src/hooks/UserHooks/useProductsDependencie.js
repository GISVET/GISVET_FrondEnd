//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";

import adminProductsContext, {
  formatListProducts,
} from "context/AdminContext/AdminProductsContext";

//=====Importaciones de servicios ====
import getGroceryProducts from "services/UserServices/getGroceryProducts";
import getFarmacyProducts from "services/UserServices/getFarmacyProducts";

//=====Importaciones de constantes ====
import { productsAdmin } from "constants/headersTables";

export function useProductsDependencie() {
  const { jwt } = useContext(userContext);
  const {
    dependency,
    products,
    loading,
    setLoading,
    isUpdateProducts,
  } = useContext(adminProductsContext);

  
  const getDependencieProducts = async (type_dependencie, name_dependencie) => {
    let response = [];
    switch (type_dependencie) {
      case "B":
        await getGroceryProducts({ jwt, name_dependencie }).then((res) => {
          if (res.message === undefined) {
            response = res;
          }
        });
        break;
      case "F":
        await getFarmacyProducts({ jwt, name_dependencie }).then((res) => {
          if (res.message === undefined) {
            response = res;
          }
        });
        break;

      case "C":
        await getGroceryProducts({ jwt, name_dependencie }).then((res) => {
          if (res.message === undefined) {
            response = res;
          }
        });
        break;
      default:
        break;
    }
    return response;
  };

  return {
    loading,
    setLoading,
    products,
    dependency,
    isUpdateProducts,
    getDependencieProducts,
    headers: productsAdmin,
  };
}
