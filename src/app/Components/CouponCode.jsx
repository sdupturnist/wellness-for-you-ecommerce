"use client";

export default function CouponCode({}) {
  return (
    <div className="coupon-code">
      <div className="">
        <input
          type="text"
          placeholder="Have coupon code?"
          className="input join-item"
        />
        <button className="btn join-item !h-[48px] hidden">
          Apply <span className="loading loading-dots loading-xs"></span>
        </button>
      </div>
      <span className="text-sm text-green-600 block my-2 hidden">
        Coupon code applied successfully!
      </span>
      <span className="text-sm text-red-500 block my-2 hidden">
        This coupon has expired or invalid
      </span>
    </div>
  );
}
