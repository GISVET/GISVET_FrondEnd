//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import UserProductsContext from "context/UserContext/UserProductsContext";

//=====Importaciones de servicios ====
import sendProductsToDependecie from "services/UserServices/ProductsServices/userGrocery/sendToDependencie";
import addNewItemService from "services/UserServices/ProductsServices/userGrocery/addNewItem";
import addNewMark from "services/UserServices/ProductsServices/userGrocery/addNewMark";
import addNewProduct from "services/UserServices/ProductsServices/userGrocery/addNewProduct";

//=====Importaciones de constantes ====

export function useGroceryProducts() {
  const { jwt,dependencieActive } = useContext(userContext);
  const [updateProducts, setUpdateProducts] = useState(false);
  const {
    products,
    brands,
    loading,
    setLoading,
    isUpdateProducts,
    isUpdateBranches,
  } = useContext(UserProductsContext);


/*El metodo recibe los datos de los componentes y 
  hace el llamado al servicio agregando el token a la peticion
  para crear una nueva marca*/
  const addMark = async ({ name_brand }) => {
      setLoading(true);
      let response = await addNewMark({ jwt, name_brand })
        .then((res) => {
          if (res.status === 200) {
            isUpdateBranches(true);
          }
            setLoading(false);
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
      return response
    };


/*El metodo recibe los datos de los componentes y 
  hace el llamado al servicio agregando el token a la peticion
  para crear un nuevo producto*/
  const addProduct = async ({ product_name, 
                              measurement_units, 
                              type_product }) => {
      setLoading(true);
      let response = await addNewProduct({
        jwt,
        product_name,
        measurement_units,
        type_product,
      })
        .then((res) => {
          if (res.status === 200) {
            isUpdateProducts(true);
          } 
          setLoading(false);
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
      return response
    }


  const addNewItem = async({data})=>{
    data["id_dependencie"] = dependencieActive.ID_DEPENDECIE;
    let response
    response = await addNewItemService({jwt,data})
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
    products,
    brands,
    addMark,
    addProduct,
    loading,
    updateProducts,
    sendTodependencie,
    addNewItem
  };
}
