"use client";

import { Link } from "react-alice-carousel";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

export default function SectionHeader({ title, url, filter, card }) {
  return (
    <div className="flex justify-between items-center mb-7">
      {card &&  <h3 className="text-xl font-semibold">{title}</h3>}
      {!card &&  <h3 className="section-title">{title}</h3>}
      {!filter && url && (
        <Link href={url} className="more">
          More
        </Link>
      )}
      {filter && (
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="border-border border rounded-lg p-3 text-sm text-body">
            <AdjustmentsHorizontalIcon className="size-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
