"use client";

import { StarIcon } from "@heroicons/react/24/solid";

export default function ReviewCount({ average, ratingCount, large }) {

 
 
  const roundedValue = Math.round(average * 10) / 10;



  return !large ? (
    <small className="flex items-center gap-1 text-body mb-2">
      <StarIcon className="sm:size-[14px] size-[12px] text-yellow" />
      <span className="block sm:text-[13px] text-[11px] leading-none">
        {average && roundedValue % 1 === 0 ? roundedValue.toFixed(1) : roundedValue.toString() }
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
