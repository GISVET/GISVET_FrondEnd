import React from "react";
import Header from "components/HeaderAdmin/header";
import styles from "./styles.module.css";

export default function Admin({ children }) {

  return (
    <div className={styles.general_admin}>
      <Header />
      {children}
    </div>
  );
}
