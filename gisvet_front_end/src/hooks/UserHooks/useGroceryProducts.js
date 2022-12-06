//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import adminProductsContext, {
  formatListProducts,
} from "context/AdminContext/AdminProductsContext";

//=====Importaciones de servicios ====
import sendProductsToDependecie from "services/UserServices/ProductsServices/userGrocery/sendToDependencie";
import addNewItem from "services/UserServices/ProductsServices/userGrocery/addNewItem";

//=====Importaciones de constantes ====

export function useGroceryProducts() {
  const { jwt,dependencieActive } = useContext(userContext);
  const [updateProducts, setUpdateProducts] = useState(false);


  const addNewItem = async({data})=>{
    data["id_dependencie"]=dependencieActive.ID_DEPENDECIE;
    let response
    response = await addNewItem({jwt,data})
    setUpdateProducts(true)
    return response
  }


  const sendTodependencie = async({document,token_tem,name_dependecie,dataProducts})=>{
    let response
    response = await sendProductsToDependecie({jwt, 
                        document,
                        token_tem,
                        name_dependecie,
                        dataProducts})
    setUpdateProducts(true)
    return response
  }

  return {
    updateProducts,
    sendTodependencie,
    addNewItem
  };
}
