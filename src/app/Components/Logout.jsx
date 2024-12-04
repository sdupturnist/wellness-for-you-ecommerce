"use client";

import { useRouter } from "next/navigation";
import { homeUrl } from "../Utils/variables";
import { useAuthContext } from "../Context/authContext";

export default function Logout({ small }) {
  const navigate = useRouter();
  const { setUserToken } = useAuthContext();

  const handleLogout = () => {
    setUserToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    document.cookie = "token=; path=/; max-age=0; secure; SameSite=Strict";
    navigate.push(`${homeUrl}login`);
    console.log("Logout success");
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
            className="btn btn-light w-full btn-medium !text-red-500 hover:border-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
