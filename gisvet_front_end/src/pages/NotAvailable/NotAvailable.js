import React from "react";
import styles from "./styles.module.css";
import banner from "./images/Background_404.png";


export default function Error() {

  return (
    <div className={styles.general_admin}>
      <div className={styles.principal_error}>
          <img src={banner} alt="Banner de error"></img>
          <h2>Ops ,¡La página a la que intentas ingresar no está disponible!</h2>
      </div>
    </div>
  );
}
