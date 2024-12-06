'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl, homeUrl, woocommerceKey } from "../Utils/variables";
import Cookies from "js-cookie";  // Import js-cookie

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
    // Get token and user ID from cookies
    const token = Cookies.get("token");
    const user_email = Cookies.get("user_email");

    // Check if user is authenticated, if not, redirect to home
    if (auth) {
      if (!token) {
        router.push(homeUrl);
        return;
      }
    }

    // Validate the token with the backend API
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
            email: user_email,
            role: Cookies.get("role"),  // Assuming 'role' is also stored in a cookie
          });
          setAuth(true);
        } else {
          setAuth(false);
          Cookies.remove("token");
          Cookies.remove("user_email");
          Cookies.remove("role");
        }
      } catch (err) {
        setAuth(false);
        console.error("Token validation failed:", err);
        setError("Session expired or invalid token");
        Cookies.remove("token");
        Cookies.remove("user_email");
        Cookies.remove("role");
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
