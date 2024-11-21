


"use client";

import Link from "next/link";
import { homeUrl } from "../Utils/variables";



export default function Return() {



  return (
    <Link href={`${homeUrl}account/return`} className="btn btn-medium btn-light">Return</Link>
  );
}
