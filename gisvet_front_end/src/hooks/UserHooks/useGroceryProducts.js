//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import adminProductsContext, {
  formatListProducts,
} from "context/AdminContext/AdminProductsContext";

//=====Importaciones de servicios ====
import sendProductsToDependecie from "services/UserServices/ProductsServices/userGrocery/sendToDependencie";

//=====Importaciones de constantes ====

export function useGroceryProducts() {
  const { jwt } = useContext(userContext);
  const [updateProducts, setUpdateProducts] = useState(false);


  const sendTodependencie = async({document,token_tem,name_dependecie,dataProducts})=>{
    let response
    response = await sendProductsToDependecie({jwt, 
                        document,
                        token_tem,
                        name_dependecie,
                        dataProducts})
    return response
  }

  return {
    updateProducts,
  };
}
