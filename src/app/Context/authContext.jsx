'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl, homeUrl, woocommerceKey } from "../Utils/variables";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

   
    if(auth){
    if (!token) {
      router.push(homeUrl);
      return;
    }
  }

    const validateToken = async () => {
      try {
        const response = await fetch(
          `${apiUrl}wp-json/custom/v1/validate-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser({
            email: localStorage.getItem("user_email"),
            role: localStorage.getItem("role"),
          });
          setAuth(true);
        } else {
          setAuth(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user_email");
         // router.push("/login");
        }
      } catch (err) {
        setAuth(false);
        console.error("Token validation failed:", err);
        setError("Session expired or invalid token");
        localStorage.removeItem("token");
        localStorage.removeItem("user_email");
       // router.push("/login");
      } finally {
        setLoadingAuth(false);
      }
    };

    validateToken();
  }, [router, auth]);

  useEffect(() => {
    if (auth && user?.email) {
      fetch(
        `${apiUrl}wp-json/wc/v3/customers${woocommerceKey}&email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setUserData(data[0]);
       
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [auth, user?.email]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        userToken,
        setUserToken,
        userData,
        setUserData,
        user,
        setUser,
        loadingAuth,
        setLoadingAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
