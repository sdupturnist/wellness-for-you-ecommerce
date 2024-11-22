"use client";

import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function AddToWishList({ small, active }) {
  return (
    <>
      {small && (
        <button
          title="Remove from list"
          className="size-8 flex items-center justify-center rounded-full p-[6px] shadow-sm absolute top-3 right-3">
          <HeartIcon
            className={`${
              active ? "text-primary" : "text-body opacity-25"
            } size-6`}
          />
        </button>
      )}

      {!small && (
        <button className="btn-light bg-white border !min-h-14 !px-4">
          <HeartIcon className="size-6 text-body opacity-25" />
        </button>
      )}
    </>
  );
}
