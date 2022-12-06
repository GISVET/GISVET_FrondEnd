//=====Importaciones de React ====
import { useContext, useCallback, useState } from "react";

//=====Importaciones de contextos ====
import userContext from "context/UserContext/UserContext";
import auditorUserContext from "context/AuditorContext/AuditorUserContext";

//=====Importaciones de servicios ====
import getUsersByDocument from "services/AuditorServices/UsersServices/getUserByDocument";
import getUsersListName from "services/AuditorServices/UsersServices/getUserListName";

//=====Importaciones de constantes ====
import { usersAdmin } from "constants/headersTables";
import { role } from "constants/constants";

export function useAuditorUsers() {
  const { jwt } = useContext(userContext);
  const {
    users,
    setUsers,
    loading,
    setLoading,
    isUpdateUsers,
    formatListUserToTable,
  } = useContext(auditorUserContext);
  const [userByDocument, setUserById] = useState({});

  let errorMessage = "";


  const GetUserByDocument = useCallback(
    ({ document }) => {
      setLoading(true);
      getUsersByDocument({ jwt, document })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setUserById(res);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  const findUserByName = useCallback(
    (name_person) => {
      setLoading(true);
      getUsersListName({ jwt, username: name_person })
        .then((res) => {
          if (res.message === "") {
            setLoading(false);
          } else {
            setLoading(false);
            errorMessage = res.message;
            setUsers(res);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setLoading]
  );

  return {
    loading,
    users,
    headers: usersAdmin,
    GetUserByDocument,
    findUserByName,
    errorMessage,
    listUserToTable: formatListUserToTable(users),
  };
}
