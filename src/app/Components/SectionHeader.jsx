"use client";

import { Link } from "react-alice-carousel";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

export default function SectionHeader({ title, url, filter, button, buttonLabel, buttonAction, card, spacingSm, spacingMd, titleSmall, small, titleCenter }) {
  return (
    <div className={`mb-5 flex justify-between items-center`}>
     {small && !titleSmall && <p className="opacity-50">Payment options</p>}
      {card && !titleSmall && <h3 className={`${titleCenter && 'text-center w-full'} text-lg font-semibold`}>{title}</h3>}
      {titleSmall &&  <h3 className={`${titleCenter ? 'text-center w-full' : ''} text-base font-bold`}>{title}</h3>}
      {!card && !small && !titleSmall && <h3 className={`${titleCenter && 'text-center w-full'} section-title`}>{title}</h3>}
      {!filter && url && !button && (
        <Link href={url} className="more">
          More
        </Link>
      )}
      {button && (
        <Link href={buttonAction} className="btn btn-medium btn-light">
          {buttonLabel}
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
