import React, { useEffect, useState } from "react";
import Table from "components/UserGrocery/TableProducts";
import styles from "./styles.module.css";
import { useProductsDependencie } from "hooks/useProductsDependencie";
import SettingsProducts from "components/UserGrocery/SettingsGroceryProducts";
import useUser from "hooks/useUser";
import { useGroceryProducts } from "hooks/useGroceryProducts";


export default function ProductsGrocery() {
  const { getDependencieProducts } = useProductsDependencie();
  const {updateProducts} =useGroceryProducts()
  const [products, setProducts] = useState([])
  const {logout, 
    islogged,
    role,
    dependencies,
    rolesUser,
    changeRol,
    changeDependencie,
    dependencieActive} = useUser()

  useEffect(()=>{
    getDependencieProducts(dependencieActive.DEPENDECIE_TYPE,dependencieActive.DEPENDECIE_NAME)
    .then(res =>{
      if (res.lenght !== 0) {
        setProducts(res)
      }
    })
  }, [updateProducts])

  useEffect(()=>{
    console.log("Listado de productos")
    console.log(products)
  }, [products])

  const showUserMenu = async (id_dependencie) => {};


  

  return (
    <div className={styles.general_users}>
      <Table
        data={products}
        keyName={"id_product"}
        actionItem={showUserMenu}
      />
      <SettingsProducts />
    </div>
  );
}
