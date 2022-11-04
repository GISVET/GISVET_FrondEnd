import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import styles from "./styles.module.css";
import PanelSearch from "../../components/PanelSearch";
import icon_Filter from "./images/Icon_Filter.png";
import SettingsAdminUser from "../SettingsAdminUser/index";
import { useAdminProducts } from "../../hooks/useAdminProducts";
import {
  filterDependencies,
  filterDependenciesName,
} from "../../constants/constants";
import SettingsAdminProducts from "../../components/SettingsAdminProducts/SettingsAdminProducts";

export default function AdminProducts() {
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
      <h1>Gestión de Productos</h1>
      <div className={styles.table_users}>
        <div className={styles.filter_users}>
          <PanelSearch onSubmit={askProduct} />
        </div>

        <Table
          headers={headers}
          data={products}
          keyName={"id_product"}
          actionItem={showUserMenu}
        />
        <SettingsAdminProducts />
      </div>
    </div>
  );
}
