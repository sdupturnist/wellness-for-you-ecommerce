"use client";

import { homeUrl } from "@/app/Utils/variables";
import Link from "next/link";
import Alerts from "../Alerts";



export default function ContactForm() {
  return (

    
    <form action="">
      <div className="grid gap-4">
       <input type="text" className="input" placeholder="Name" />
        <input type="email" className="input" placeholder="Email" />
        <textarea className="input" placeholder="Message"></textarea>
        <button className="btn btn-large w-full">Submit</button>
      </div>
    </form>
  );
}
