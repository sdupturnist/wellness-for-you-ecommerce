"use client";



import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { homeUrl } from '@/app/Utils/variables';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://admin.wellness4u.in/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store JWT token
      router.push(`${homeUrl}/account`); // Redirect to the dashboard or home page
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;





// import { homeUrl } from "@/app/Utils/variables";
// import Link from "next/link";
// import Alerts from "../Alerts";



// export default function Login() {
//   return (
//     <form action="">
//       <div className="grid gap-4">
//         <Alerts status="red" title="Incorrect email or password"/>
//         <input type="email" className="input" placeholder="Email" />
//         <input type="password" className="input" placeholder="Password" />
//         <button className="btn btn-large w-full">Login</button>
//         <Link className="hover:text-primary transition-all" href={`${homeUrl}reset-password`}>Forgotten Password</Link>
//       </div>
//     </form>
//   );
// }
