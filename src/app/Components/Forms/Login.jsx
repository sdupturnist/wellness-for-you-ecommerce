"use client";

import { homeUrl } from "@/app/Utils/variables";
import Link from "next/link";
import Alerts from "../Alerts";



export default function Login() {
  return (
    <form action="">
      <div className="grid gap-4">
        <Alerts status="red" title="Incorrect email or password"/>
        <input type="email" className="input" placeholder="Email" />
        <input type="password" className="input" placeholder="Password" />
        <button className="btn btn-large w-full">Login</button>
        <Link className="hover:text-primary transition-all" href={`${homeUrl}reset-password`}>Forgotten Password</Link>
      </div>
    </form>
  );
}
