"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl, homeUrl, woocommerceKey } from "@/app/Utils/variables";
import Link from "next/link";
import Alerts from "../Alerts";
import { useAuthContext } from "@/app/Context/authContext";
import Cookies from "js-cookie";  // Import js-cookie

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}wp-json/custom/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      const { token, user_id, user_email, role } = data;

      // Store the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user_email", user_email);
      localStorage.setItem("u_id", user_id);

      // Store the token in a cookie (expires in 1 hour)
      Cookies.set("token", token, { expires: 1 / 24 }); // expires in 1 hour
      Cookies.set("user_email", user_email, { expires: 1 / 24 }); // expires in 1 hour
      

      setAuth(true);

      // Redirect the user to a protected page (e.g., dashboard)
      router.back();

  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alerts title={error} status="red" />}
      <form onSubmit={handleLogin}>
        <div className="grid gap-4">
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-large w-full"
            disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link
            className="hover:text-primary transition-all"
            href={`${homeUrl}password-forget`}>
            Forgotten Password
          </Link>
        </div>
      </form>
    </>
  );
}
