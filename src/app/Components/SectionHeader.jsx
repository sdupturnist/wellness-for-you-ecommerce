


"use client";

import { Link } from "react-alice-carousel";
import { homeUrl } from "../Utils/variables";


export default function SectionHeader() {
  return (
    <div className="flex justify-between items-center sm:mb-9 mb-6">
          <h3 className="section-title">Featured products</h3>
          <Link href={homeUrl} className="more">More</Link>
        </div>
  );
}




