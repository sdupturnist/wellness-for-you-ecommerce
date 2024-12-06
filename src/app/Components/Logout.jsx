"use client";

import { useRouter } from "next/navigation";
import { homeUrl } from "../Utils/variables";
import { useAuthContext } from "../Context/authContext";
import Cookies from "js-cookie"; // Import js-cookie

export default function Logout({ small }) {
  const router = useRouter();

  const { setAuth, setUserToken, setUserData, setUser, setLoadingAuth } =
    useAuthContext();

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove("token");
    Cookies.remove("user_email");
    Cookies.remove("u_id"); 

    // Reset context and state
    setAuth(false);
    setUserToken("");
    setUserData([]);
    setUser(null);
    setLoadingAuth(true);

    // Redirect to the login page
    router.push(`${homeUrl}/login`);
  };

  return (
    <>
      {small ? (
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </span>
      ) : (
        <div className="px-4 pt-3 sm:pb-4">
          <button
            onClick={handleLogout}
            className="btn btn-light w-full btn-medium !text-red-500 hover:border-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
