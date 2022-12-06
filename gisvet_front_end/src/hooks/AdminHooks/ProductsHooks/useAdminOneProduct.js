//=====Importaciones de React ====
import { useContext, useState, useEffect } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";

//=====Importaciones de constantes ====
import { dependenciesAdmin } from "constants/headersTables";

//=====Importaciones de servicios ====
import getProductDetail from "services/AdminServices/ProductsServices/getProductDetail";

export function useAdminOneProduct(id_product, presentation) {
  const { jwt } = useContext(userContext);
  const [ product, setProduct ] = useState();
  const [loading, setLoading] = useState();
  let errorMessage = "";

  useEffect(() => {
    askProduct();
  }, []);

  const askProduct = () => {
    setLoading(true);
    getProductDetail({ jwt, id_product, presentation })
      .then((res) => {
        if (res.message !== undefined) {
          setLoading(false);
        } else {
          setLoading(false);
          errorMessage = res.message;
          setProduct(res);
        }
      })
      .catch((err) => {});
  };

  return {
    loading,
    setLoading,
    product,
    headers: dependenciesAdmin,
  };
}
