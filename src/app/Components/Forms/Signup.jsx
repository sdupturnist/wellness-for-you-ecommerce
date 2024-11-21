"use client";

import { homeUrl } from "@/app/Utils/variables";
import Link from "next/link";
import ListOptions from "../ListOptions";

export default function Signup() {
  return (
    <form action="">
      <div className="grid gap-4">
        <input type="text" className="input" placeholder="Name" />
        <input type="email" className="input" placeholder="Email" />
        <input type="password" className="input" placeholder="Password" />
        <input
          type="password"
          className="input"
          placeholder="Confirm password"
        />
        <div className="grid gap-3">
          <ListOptions title="Sign up for our newsletter?" noButton small />
          <ListOptions
            title="I have read and agree to the Privacy Policy"
            noButton
            small
          />
        </div>
        <button className="btn btn-large w-full">Signup</button>
      </div>
    </form>
  );
}
