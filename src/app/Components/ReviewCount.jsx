"use client";

import { StarIcon } from "@heroicons/react/24/solid";

export default function ReviewCount({ data, large,  }) {


  const totalReviews = data && data.length;
const totalReviewCount = data && data.reduce((sum, review) => sum + review.review_count, 0);
const averageReviewCount = totalReviewCount / totalReviews;

//console.log(`Average review count: ${averageReviewCount.toFixed(1)} out of 5`);



  return !large ? (
    <small className="flex items-center gap-1 text-body mb-2">
      <StarIcon className="size-[14px] text-yellow" />
      <span className="block text-[13px] leading-none">{data ? averageReviewCount.toFixed(1) : 0}</span>
      <span className="block opacity-50 text-[13px] leading-none">{`(${totalReviews})`}</span>
    </small>
  ) : (
    <small className="flex items-center gap-1 text-body mb-2">
      <StarIcon className="size-[17px] text-yellow" />
      <span className="block text-[15px] leading-none">{data ? averageReviewCount.toFixed(1) : 0}</span>
      <span className="block opacity-50 text-[15px] leading-none">{`(${totalReviews})`}</span>
    </small>
  );
}






// return !large ? (
//   <small className="flex items-center gap-1 text-body mb-2">
//     <span className="count">
//     {averageReviewCount.toFixed(1)}
//       <StarIcon className="size-[10px] sm:size-3 text-white" />
//     </span>
//     <span className="opacity-50 text-[12px]">{`(${totalReviews})`}</span>
//   </small>
// ) : (
//   <small className="flex items-center gap-2 text-body mb-2">
//     <span className="count-large">
//     {averageReviewCount.toFixed(1)}
//       <StarIcon className="size-[10px] sm:size-3 text-white" />
//     </span>
//     <span className="opacity-50 text-base">{`(${totalReviews} Ratings)`}</span>
//   </small>
// );
// }
