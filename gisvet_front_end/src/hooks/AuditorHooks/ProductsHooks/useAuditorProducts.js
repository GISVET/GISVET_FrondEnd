//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import auditorProductsContext from "context/AuditorContext/AuditorProductsContext";

//=====Importaciones de constantes ====
import { productsAdmin } from "constants/headersTables";

export function useAuditorProducts() {
  const { jwt } = useContext(userContext);
  const {
    dependency,
    products,
    loading,
    setLoading,
    isUpdateProducts,
    isUpdateBranches,
    isUpdateFeatures,
  } = useContext(auditorProductsContext);
  let errorMessage = "";

  return {
    loading,
    setLoading,
    products,
    dependency,
    isUpdateProducts,
    headers: productsAdmin,
  };
}
