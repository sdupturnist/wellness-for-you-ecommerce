"use client";

import Link from "next/link";
import { homeUrl } from "../Utils/variables";

export default function DropDown({ items, label, icon }) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button">
        {!icon ? label : icon}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content  menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {items &&
          items.map((item, index) => (
            <li key={index}>
              <Link href={`${homeUrl}${item?.url}`}>{item?.label}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
