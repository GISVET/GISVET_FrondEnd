import React from "react";
import styles from "./styles.module.css";
import banner from "./images/Background_404.png";


export default function Error() {

  return (
    <div className={styles.general_admin}>
      <div className={styles.principal_error}>
          <img src={banner} alt="Banner de error"></img>
          <h1>Ops ! Lo sentimos pero en este momento no estamos disponibles</h1>
      </div>
    </div>
  );
}
