//=====Importaciones de React ====
import React, { useEffect, useState } from "react";

//=====Importaciones de estilos ====
import styles from "./styles.module.css";

//=====Importaciones de componentes generales ====
import Table from "../TableProducts";
import SettingsProducts from "../SettingsGroceryProducts";

//=====Importaciones de componentes de PrimeReact ====

//=====Importaciones de hooks ====
import { useProductsDependencie } from "../../../../hooks/UserHooks/useProductsDependencie";
import useUser from "../../../../hooks/UserHooks/useUser";
import { useGroceryProducts } from "../../../../hooks/UserHooks/useGroceryProducts";




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
