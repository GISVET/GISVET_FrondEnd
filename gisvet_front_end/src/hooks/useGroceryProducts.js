import { useContext, useCallback, useState } from "react";
import userContext from "context/UserContext";
import adminProductsContext, {
  formatListProducts,
} from "context/AdminProductsContext";
import { productsAdmin } from "constants/headersTables";
import addNewMark from "services/userGrocery/addNewMark";
import addNewLote from "services/addNewLote";
import addNewProduct from "services/userGrocery/addNewProduct";
import addNewItem from "services/userGrocery/addNewItem";

export function useGroceryProducts() {
  const { jwt } = useContext(userContext);
  const [updateProducts, setUpdateProducts] = useState(false)
  const addMark = async ({ name_brand }) => {
    return addNewMark({ jwt, name_brand })
        .then((res) => {
          if (res.message === "") {
          } else {
            setUpdateProducts(true);
          }
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    };

  const addProduct =async ({ product_name, measurement_units, type_product }) => {
    return addNewProduct({
        jwt,
        product_name,
        measurement_units,
        type_product,
      })
        .then((res) => {
          if (res.message === "") {
            
          } else {
            setUpdateProducts(true);
          }
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    };

  const addItem = async(data) => {
      return addNewItem({ jwt, data })
        .then((res) => {
          if (res.message === "") {
          } else {
            setUpdateProducts(true);
          }
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    };

  return {
    updateProducts,
    addMark,
    addItem,
    addProduct,
  };
}
