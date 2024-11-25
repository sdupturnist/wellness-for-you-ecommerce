"use client";

import { StarIcon } from "@heroicons/react/24/solid";

export default function ReviewCount({ average, ratingCount, large }) {
  return !large ? (
    <small className="flex items-center gap-1 text-body mb-2">
      <StarIcon className="size-[14px] text-yellow" />
      <span className="block text-[13px] leading-none">
        {average && average}
      </span>
      {/* <span className="block opacity-50 text-[13px] leading-none">({ratingCount && ratingCount} Review{ratingCount && ratingCount > 1 && 's'})</span> */}
    </small>
  ) : (
    <small className="flex items-center gap-1 text-body mb-2">
      <StarIcon className="size-[17px] text-yellow" />
      <span className="block text-[15px] leading-none">
        {average && average}
      </span>
      <span className="block opacity-50 text-[15px] leading-none">
        ({ratingCount && ratingCount} Review
        {ratingCount && ratingCount > 1 && "s"})
      </span>
    </small>
  );
}
