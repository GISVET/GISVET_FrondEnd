import React, { useEffect, useState } from "react";
import Table from "components/TableProducts/TableProducts";
import styles from "./styles.module.css";
import PanelSearch from "components/PanelSearch";
import { useAdminProducts } from "hooks/useAdminProducts";
import {
  filterDependencies,
  filterDependenciesName,
} from "constants/constants";
import SettingsAdminProducts from "components/SettingsAdminProducts/SettingsAdminProducts";

export default function AdminProducts() {
  const { loading, products, headers, askProductName } = useAdminProducts();

  const showUserMenu = async (id_dependencie) => {};

  const askProduct = (keyword) => {
    askProductName(keyword);
  };

  console.log("Listado de productos")
  console.log(products)

  return (
    <div className={styles.general_users}>
      <h1>Gestión de Productos</h1>
      <Table
        headers={headers}
        data={products}
        keyName={"id_product"}
        actionItem={showUserMenu}
      />
      <SettingsAdminProducts />
    </div>
  );
}
