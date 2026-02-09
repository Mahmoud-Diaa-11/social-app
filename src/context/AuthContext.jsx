import { createContext, useEffect, useState } from "react";
import { getLoggedUser } from "../services/getLoggedUser";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  async function getUser() {
    const response = await getLoggedUser();

    if (response.message == "success") {
      setUserData(response.user);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setUserToken(localStorage.getItem("token"));
      getUser();
    }
  }, [userToken]);
  return (
    <AuthContext.Provider
      value={{ userToken, setUserToken, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
