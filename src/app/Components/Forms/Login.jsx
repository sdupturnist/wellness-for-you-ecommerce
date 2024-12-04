"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl, homeUrl } from "@/app/Utils/variables";
import Link from "next/link";
import Alerts from "../Alerts";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}wp-json/jwt-auth/v1/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store JWT token
      router.push(`${homeUrl}/account`); // Redirect to the dashboard or home page
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <>
      {error && <Alerts title={error} status="red" />}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button className="btn btn-large w-full" type="submit">
            Login
          </button>
          <Link
            className="hover:text-primary transition-all"
            href={`${homeUrl}reset-password`}>
            Forgotten Password
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
