"use client";

import { useRouter } from "next/navigation";
import { homeUrl } from "../Utils/variables";
import { useAuthContext } from "../Context/authContext";

export default function Logout({ small }) {
  const router = useRouter();

  const { setAuth, setUserToken, setUserData, setUser, setLoadingAuth } =
    useAuthContext();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");

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
        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </li>
      ) : (
        <div className="px-4 pt-3 pb-4">
          <button
            onClick={handleLogout}
            className="btn btn-light w-full btn-medium !text-red-500 hover:border-red-500">
            Logout
          </button>
        </div>
      )}
    </>
  );
}
