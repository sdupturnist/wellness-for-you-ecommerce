// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {


    setUserToken(Cookies.get('token'))


  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        userToken,
        setUserToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
