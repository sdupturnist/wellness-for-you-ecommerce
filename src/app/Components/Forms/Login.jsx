"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl, homeUrl } from "@/app/Utils/variables";  // Ensure these URLs are correctly set
import Link from "next/link";
import Alerts from "../Alerts";
import { useAuthContext } from "@/app/Context/authContext";
import Cookies from "js-cookie";  // Import js-cookie for cookies handling
import Loading from "../Loading";

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
    setError(""); // Clear any previous errors

    try {
      // Sending login request to API
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

      // Destructuring the data from the response
      const { token, user_id, user_email, role } = data;

      // Storing token and user data in cookies
      Cookies.set("token", token, { expires: 1 / 24, secure: true, sameSite: 'Strict' });
      Cookies.set("user_email", user_email, { expires: 1 / 24, secure: true, sameSite: 'Strict' });
      Cookies.set("u_id", user_id, { expires: 1 / 24, secure: true, sameSite: 'Strict' });

      // Updating auth context
      setAuth(true);

      // Redirecting user to account page (or wherever necessary)
      router.push(`${homeUrl}account`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alerts title={error} status="red" />}  {/* Display error if any */}
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
            {loading ? <Loading dot classes="size-4 !text-dark"/> : "Login"}
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
