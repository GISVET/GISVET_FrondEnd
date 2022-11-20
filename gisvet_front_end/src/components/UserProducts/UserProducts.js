import React, { useEffect, useState } from "react";
import Table from "components/TableProducts/TableProducts";
import styles from "./styles.module.css";
import { useAdminProducts } from "hooks/useAdminProducts";
export default function UserProducts() {
  const { loading, products, headers, askProductName } = useAdminProducts();
  const [typeFilter, setTypeFilter] = useState([]);
  const [typeFilterId, setTypeFilterId] = useState(0);
  const [askFilter, setAskFilter] = useState();

  const search = function(Keyword) {
    console.log(Keyword + " a buscar");
  };

  const showUserMenu = async (id_dependencie) => {};

  const askProduct = (keyword) => {
    askProductName(keyword);
  };

  return (
    <div className={styles.general_users}>
      <h1>Productos en Bodega</h1>
        <Table
          headers={headers}
          data={products}
          keyName={"id_product"}
          actionItem={showUserMenu}
        />
    </div>
  );
}
