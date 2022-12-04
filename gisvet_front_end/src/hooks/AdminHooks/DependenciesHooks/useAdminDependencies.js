//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import adminDependencyContext from "context/AdminContext/AdminDependencyContext";

//=====Importaciones de servicios ====
import addNewDependency from "services/AdminServices/DependenciesServices/addNewDependency";
import getDependencyDetails from "services/AdminServices/DependenciesServices/getDependencyDetail";

//=====Importaciones de constantes ====
import { dependenciesAdmin } from "constants/headersTables";

export function useAdminDependencies() {
  const { jwt } = useContext(userContext);
  const {
    dependency,
    setDependency,
    dependencies,
    setDependencies,
    formatListDependencies,
    loading,
    setLoading,
    isUpdateDependencies,
  } = useContext(adminDependencyContext);
  let errorMessage = "";

  const addDependency = useCallback(
    ({ dependencie_name, type_dependencie }) => {
      setLoading(true);
      return addNewDependency({ jwt, dependencie_name, type_dependencie })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            isUpdateDependencies(true);
          }
          return res;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const askDependency = useCallback(
    (dependencie_name) => {
      setLoading(true);
      getDependencyDetails({ jwt, dependencie_name })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setDependency(res);
          }
        })
        .catch((err) => {});
    },
    [setLoading]
  );

  return {
    loading,
    setLoading,
    dependencies,
    dependency,
    isUpdateDependencies,
    headers: dependenciesAdmin,
    addDependency,
    askDependency,
  };
}
