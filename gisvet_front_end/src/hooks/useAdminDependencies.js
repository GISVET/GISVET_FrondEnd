import { useContext, useCallback, useState } from "react";
import userContext from "context/UserContext";
import adminDependencyContext from "context/AdminDependencyContext";
import { dependenciesAdmin } from "constants/headersTables";
import addNewDependency from "services/addNewDependency";
import getDependenciesName from "services/getDependenciesName";
import getDependenciesOrder from "services/getDependenciesOrder";
import getDependenciesType from "services/getDependenciesType";
import getDependencyDetails from "services/getDependencyDetail";


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
          return res
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const orderDependency = useCallback(
    (order_name) => {
      setLoading(true);
      getDependenciesOrder({ jwt, order_name })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setDependencies(formatListDependencies(res));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const askDependencyType = useCallback(
    (type_dependencie) => {
      setLoading(true);
      setLoading(true);
      getDependenciesType({ jwt, type_dependencie })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setDependencies(formatListDependencies(res));
          }
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
        .catch((err) => {
        });
    },
    [setLoading]
  );

  const askDependencyName = useCallback(
    (dependencie_name) => {
      setLoading(true);
      getDependenciesName({ jwt, dependencie_name })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setDependencies(formatListDependencies(res));
          }
        })
        .catch((err) => {
          setDependencies([]);
        });
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
    orderDependency,
    askDependencyName,
    askDependencyType,
    askDependency,
  };
}
