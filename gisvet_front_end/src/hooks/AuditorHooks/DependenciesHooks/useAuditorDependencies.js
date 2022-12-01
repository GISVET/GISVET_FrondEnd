//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "../../../context/UserContext/UserContext";
import adminDependencyContext from "../../../context/AuditorContext/AuditorDependencyContext";

//=====Importaciones de constantes ====
import { dependenciesAdmin } from "constants/headersTables";

//=====Importaciones de servicios ====
import getDependenciesName from "../../../services/AuditorServices/DependenciesServices/getDependenciesListAuditor";

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

  return {
    loading,
    setLoading,
    dependencies,
    dependency,
    isUpdateDependencies,
    headers: dependenciesAdmin,
  };
}
