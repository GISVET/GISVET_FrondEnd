//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import adminProductsContext, {
  formatListProducts,
} from "context/AdminContext/AdminProductsContext";

//=====Importaciones de servicios ====

//=====Importaciones de constantes ====
import { productsAdmin } from "constants/headersTables";

export function useGroceryProducts() {
  const { jwt } = useContext(userContext);
  const [updateProducts, setUpdateProducts] = useState(false);

  return {
    updateProducts,
  };
}
