"use client";

import { PencilIcon } from "@heroicons/react/24/solid";

export default function ListOptions({ title, noButton, small, data, titleBold }) {
  return (
    <li className={`${small ? "list-options-small" : "list-options"} !gap-2`}>
      <div>
        <input type="radio" className="radio radio-sm" name="selected_address" />
        <label className={`${titleBold && 'font-semibold'}`}>{title}</label>
      </div>
      <div className="pl-8 !grid">
        <div className="!grid !gap-2">
        {data?.id && <span>{data?.id}</span>}
          {data?.address_1 && <span>{data?.address_1}</span>}
          {data?.address_2 && <span>{data?.address_2}</span>}
          {data?.city && (
            <span>
              {data?.city}, {data?.state && data?.state},{" "}
              {data?.country && data?.country},{" "}
              {data?.postcode && data?.postcode}
            </span>
          )}
        </div>
        <div>
          {!noButton && (
            <button className="btn-light btn-medium mt-1" onClick={(e) => editAddress()}>
              Edit <PencilIcon className="size-[13px]" />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
