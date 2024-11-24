"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { homeUrl } from "../Utils/variables";
import Link from "next/link";

export default function SectionHeader({
  title,
  url,
  filter,
  filterData,
  button,
  buttonLabel,
  buttonAction,
  card,
  spacingSm,
  spacingMd,
  titleSmall,
  small,
  titleCenter,
}) {
  return (
    <div className={`mb-5 flex justify-between items-center`}>
      {small && !titleSmall && <p className="opacity-50">Payment options</p>}
      {card && !titleSmall && (
        <h3
          className={`${
            titleCenter && "text-center w-full"
          } text-lg font-semibold`}>
          {title}
        </h3>
      )}
      {titleSmall && (
        <h3
          className={`${
            titleCenter ? "text-center w-full" : ""
          } text-base font-bold`}>
          {title}
        </h3>
      )}
      {!card && !small && !titleSmall && (
        <h3 className={`${titleCenter && "text-center w-full"} section-title`}>
          {title}
        </h3>
      )}
      {!filter && url && !button && (
        <Link href={url} className="text-primary text-sm">
          More
        </Link>
      )}
      {button && (
        <Link href={buttonAction} className="btn btn-medium btn-light">
          {buttonLabel}
        </Link>
      )}
      {filter && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="text-sm text-body">
            <AdjustmentsHorizontalIcon className="size-5" />
          </div>
         
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            {filterData &&
              filterData.map((item, index) => (
                <li key={index}>
                  <Link href={`${homeUrl}${item?.slug}`}>{item?.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
