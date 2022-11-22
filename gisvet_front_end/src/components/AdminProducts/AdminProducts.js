import React, { useEffect, useState } from "react";
import Table from "components/TableProducts/TableProducts";
import styles from "./styles.module.css";
import { useAdminProducts } from "hooks/useAdminProducts";
import SettingsAdminProducts from "components/SettingsAdminProducts/SettingsAdminProducts";

export default function AdminProducts() {
  const {products, headers, askProductName } = useAdminProducts();

  const showUserMenu = async (id_dependencie) => {};

  return (
    <div className={styles.general_users}>
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
