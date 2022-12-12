//=====Importaciones de React ====
import React,{useState, useEffect} from "react";

//=====Importaciones de enrutamiento====
import { Route, Router, Switch } from "wouter";

import { UserProductsContextProvider } from "context/UserContext/UserProductsContext";

//=====Importaciones de componentes ====
import Header from "components/UserComponents/HeaderUser/header";
import Loading from "components/GeneralComponents/Loading";
import ProductsGrocery from "components/UserComponents/UserGrocery/ProductsGrocery";
import ProductsFarmacy from "components/UserComponents/UserFarmacy/ProductsFarmacy";
import AdminPatients from "components/UserComponents/UserFarmacy/AdminPatients/AdminPatients/AdminPatients";

//=====Importaciones de estilos ====
import styles from './styles.module.css';

//=====Importaciones de hooks ====
import useUser from "hooks/UserHooks/useUser";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";


export default function User({params,children}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { islogged, role, dependencieActive } = useUser();
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (islogged && role === "Usuario") {
      selectDepartament();
    } else {
      setIsAuthorized(false);
    }
  }, [islogged, role, dependencieActive]);

  const selectDepartament = () => {
    if (
      dependencieActive !== undefined &&
      Object.entries(dependencieActive).length !== 0 &&
      dependencieActive !== null
    ) {
      switch (dependencieActive.DEPENDECIE_TYPE) {
        case "B":
          setIsAuthorized(true);
          navigate("/user/grocery");
          break;
        case "F":
          setIsAuthorized(true);
          navigate("/user/farmacy");
          break;
        case "C":
          setIsAuthorized(true);
          navigate("/user/consultory");
          break;
        default:
          navigate("/unauthorized");
          break;
      }
    }
  }


  return (
    <>
      {isAuthorized ? (
        <div className={styles.general_admin+` ${styles[dependencieActive.DEPENDECIE_TYPE]}`}>
          <UserProductsContextProvider>
          <div className={styles.general_admin}>
            <Header />
            <Switch>
              <Route path="/user/grocery">
                  <ProductsGrocery></ProductsGrocery>
              </Route>

              <Route path="/user/patients">
                <AdminPatients/>
              </Route>

              <Route path="/user/farmacy">
                <ProductsFarmacy></ProductsFarmacy>
              </Route>
              <Route path="/user/consultory">
                  <ProductsFarmacy></ProductsFarmacy>
              </Route>

            </Switch>
          </div>
          </UserProductsContextProvider>
        </div>
      ) : (
        <Loading text="Cargando Datos"></Loading>
      )}
    </>
  );
}
