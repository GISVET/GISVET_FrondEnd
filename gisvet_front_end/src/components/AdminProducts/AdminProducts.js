import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import styles from './styles.module.css';
import PanelSearch from "../../components/PanelSearch";
import icon_Filter from "./images/Icon_Filter.png"
import SettingsAdminUser from "../SettingsAdminUser/index";
import {useAdminProducts} from "../../hooks/useAdminProducts";
import {
    filterDependencies,
    filterDependenciesName,
  } from "../../constants/constants";
import SettingsAdminProducts from "../../components/SettingsAdminProducts/SettingsAdminProducts";



export default function AdminProducts(){
    const {loading, products,headers} = useAdminProducts()
    const [typeFilter, setTypeFilter] = useState([]);
    const [typeFilterId, setTypeFilterId] = useState(0);

    const search = function(Keyword){
        console.log(Keyword+' a buscar')
    }

    const showUserMenu = async (id_dependencie) => {
    };

    return (
        <div className={styles.general_users}>
            <h1>Gestión de Productos</h1>
                <div className={styles.table_users}>
                <div className={styles.filter_users}>
          <PanelSearch onSubmit={""} />
          <div className={styles.buscador}>
            <select
              placeholder="Filtrar"
              onChange={""}
              className={styles.filter_dependencies}
              type="text"
            >
              {filterDependencies.map((type, index) => {
                if (index == 0) {
                  return (
                    <>
                      <option key={0} disabled={""} defaultValue={true}>
                        Seleccionar
                      </option>
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    </>
                  );
                } else {
                  return (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  );
                }
              })}
              ;
            </select>
            <select
              selected
              placeholder="Filtrar"
              onChange={""}
              className={styles.filter_dependencies_option}
              type="text"
            >
              {typeFilter.map((type, index) => {
                if (index == 0) {
                  return (
                    <>
                      <option key={0} disabled={""} defaultValue={true}>
                        Seleccionar
                      </option>
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    </>
                  );
                } else {
                  return (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  );
                }
              })}
              ;
            </select>
            <input
              type="image"
              src={icon_Filter}
              onClick={""}
              className={styles.image_buscar}
            />
          </div>
        </div>

                <Table headers={headers} 
                data={products}
                          keyName={"id_product"}
                          actionItem={showUserMenu}
                />  
                <SettingsAdminProducts /> 
            </div>
        </div>
    )

}