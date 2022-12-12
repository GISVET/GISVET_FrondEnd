import React, { useEffect} from "react";
import styles from "./styles.module.css";
import banner from "./images/Background_404.png";

import useLocationWouter from "wouter/use-location";
import {useLocation, Route, Link } from "wouter"




export default function Error() {
  const [location] = useLocationWouter();
  const [,navigate] = useLocation()

  useEffect(()=>{
      console.log(location)
  },[location])

  return (
    <div className={styles.general_admin}>
      <div className={styles.principal_error}>
          <img src={banner} alt="Banner de error"></img>
          <h2>Ops ! Lo sentimos pero en este momento la pagina solicitada no está en uso</h2>
          <a onClick={() => navigate("/")}>Ir a iniciar sesión</a>
      </div>
    </div>
  );
}
