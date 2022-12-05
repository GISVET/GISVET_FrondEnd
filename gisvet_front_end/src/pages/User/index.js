//=====Importaciones de React ====
import React,{useState, useEffect} from "react";

//=====Importaciones de enrutamiento====
import { Route, Router, Switch } from "wouter";

//=====Importaciones de componentes ====
import Header from "components/UserComponents/HeaderUser/header";
import Loading from "components/GeneralComponents/Loading";
import ProductsGrocery from "components/UserComponents/UserGrocery/ProductsGrocery";
import ProductsFarmacy from "components/UserComponents/UserFarmacy/ProductsFarmacy";

//=====Importaciones de estilos ====
import styles from './styles.module.css';

//=====Importaciones de hooks ====
import useUser from "hooks/UserHooks/useUser";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";


export default function User({params,children}) {
  const [body, setBody] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { islogged, role, dependencieActive } = useUser();
  const [location, navigate] = useLocation();

  useEffect(()=>{
    console.log(params)
  },[])

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
          setBody(bodyGrocery);
          break;
        case "F":
          setIsAuthorized(true);
          navigate("/user/farmacy");
          setBody(bodyPharmacy);
          break;
        case "C":
          setIsAuthorized(true);
          navigate("/user/consultory");
          setBody(bodySurgery);
          break;
        default:
          navigate("/unauthorized");
          break;
      }
    }
  }
  const bodyGrocery= <div className={styles.general_admin}>
                  <Header />
                  <ProductsGrocery></ProductsGrocery>
              </div>


  const bodyPharmacy=<div className={styles.general_admin}>
                          <Header />
                          <ProductsFarmacy></ProductsFarmacy>
                      </div>

  const bodySurgery=<div className={styles.general_admin}>
                      <Header />
                      {children}
                  </div>

  return (
    <>
      {isAuthorized ? (
        <Switch>
          <Route path="/user/grocery">
            {body}
          </Route>
          <Route path="/user/farmacy">
            {body}
          </Route>
          <Route path="/user/consultory">
            {body}
          </Route>
        </Switch>
      ) : (
        <Loading text="Cargando Datos"></Loading>
      )}
    </>
  );
}
