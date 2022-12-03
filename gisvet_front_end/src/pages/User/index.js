//=====Importaciones de React ====
import React,{useState, useEffect} from "react";

//=====Importaciones de componentes ====
import Header from "../../components/UserComponents/HeaderUser/header";
import ProductsGrocery from "../../components/UserComponents/UserGrocery/ProductsGrocery";

//=====Importaciones de estilos ====
import styles from './styles.module.css';

//=====Importaciones de hooks ====
import useUser from "../../hooks/UserHooks/useUser";

//=====Importaciones de enrutamiento ====
import { useLocation } from "wouter";


export default function User({children}) {
  const [body, setBody] = useState();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { islogged, role, dependencieActive } = useUser();
  const [, navigate] = useLocation();

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
    console.log(children)
      console.log(`sta es la dependencia ${dependencieActive.DEPENDECIE_TYPE}`);
      switch (dependencieActive.DEPENDECIE_TYPE) {
        case "B":
          console.log("Entra en el usuario bodega");
          setIsAuthorized(true);
          setBody(bodyGrocery);
          break;
        case "F":
          setIsAuthorized(true);
          setBody(bodyPharmacy);
          break;
        case "C":
          setIsAuthorized(true);
          setBody(bodySurgery);
          break;
        default:
          navigate("/unauthorized");
          break;
      }
    const bodyGrocery= <div className={styles.general_admin}>
                    <Header />
                    <ProductsGrocery></ProductsGrocery>
                </div>


    const bodyPharmacy=<div className={styles.general_admin}>
                            <Header />
                            <ProductsGrocery></ProductsGrocery>
                        </div>

    const bodySurgery=<div className={styles.general_admin}>
                        <Header />
                        {children}
                    </div>

  return (
    <>
      {isAuthorized ? (
        body
      ) : (
        <>
          <i className="pi pi-spin pi-refresh" style={{ fontSize: "6em" }}></i>
          <h2>Cargando Datos</h2>
        </>
      )}
    </>
  );
}
