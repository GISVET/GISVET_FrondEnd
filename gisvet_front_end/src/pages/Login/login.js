//=====Importaciones de reac====  
import React, { useEffect, useState } from "react";

//=====Importaciones de enrutamiento====  
import { useLocation } from "wouter";

//=====Importaciones de estilos====  
import styles from "./styles.module.css";

//=====Importaciones de imagenes y logos====  
import logo from "../.././images/Proyecto_Logo_GisVet.png";

//=====Importaciones de los hooks====  
import useUser from "hooks/UserHooks/useUser";

//=====Importaciones de constantes====  
import { loginErrorMessage } from "constants/constants";

function Login() {
  const [, navigate] = useLocation();
  const { login, islogged, role, IdUser, dependencieActive, errorMessage } = useUser();

  const [data, setData] = useState({
                                      username: "",
                                      password: "",
                                    });

  const className =
    errorMessage !== "" || errorMessage == undefined
      ? styles.error_message
      : styles.no_error;

  useEffect(() => {
    if (islogged && role != null) {
      switch (role) {
        case "Administrador":
          navigate("/AdminDependencies");
          break;
        case "Usuario":
          selectDependecieToShow();
          break;
        case "Auditor":
          navigate("/AuditorDependencies");
          break;
        default:
          navigate("/unauthorized");
          break;
      }
    }
  }, [islogged, role, navigate]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    let newData = { ...data, [name]: value };
    setData(newData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(data);
  };

  const selectDependecieToShow = () => {
    if (
      dependencieActive !== undefined &&
      Object.entries(dependencieActive).length !== 0 &&
      dependencieActive !== null
    ) {
      switch (dependencieActive.DEPENDECIE_TYPE) {
        case "B":
          navigate("/user");
          break;
        case "F":
          navigate("/user");
          break;
        case "C":
          navigate("/user");
          break;
        default:
          navigate("/noAssigned");
          break;
      }
    } else {
      navigate("/noAssigned");
    }
  };

  return (
    <div className={styles.general}>
      <div className={styles.rigth}>
        <div className={styles.logo_div}>
          <img src={logo} alt="Logo GisVet" />
        </div>
      </div>
      <div className={styles.left}>
        <form className={styles.login_div} onSubmit={handleSubmit}>
          <h3>Correo electrónico</h3>
          <input
            className={className}
            name="username"
            type="text"
            onChange={handleInputChange}
            value={data.username}
            required="required"
            placeholder="clinicauptc@uptc.edu.co"
          />
          <h3>Contraseña</h3>
          <input
            className={className}
            name="password"
            type="password"
            onChange={handleInputChange}
            value={data.password}
            required="required"
            placeholder="**********"
          />
          {(errorMessage != "" || errorMessage == undefined) && (
            <h3 className={className}>{loginErrorMessage}</h3>
          )}
          <input type="submit" value="Ingresar" />
          <a>
            <h4>¿Olvidaste tu contraseña?</h4>
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
