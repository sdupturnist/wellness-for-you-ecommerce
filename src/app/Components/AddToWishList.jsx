"use client";

import { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function AddToWishList({ id, small, active }) {
  // State to manage the active status
  const [isActive, setIsActive] = useState(active);

  // Check if the item is in local storage on mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (savedWishlist.includes(id)) {
      setIsActive(true);
    }
  }, [id]);

  const handleClick = () => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isActive) {
      // If already in wishlist, remove it
      const updatedWishlist = savedWishlist.filter((itemId) => itemId !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsActive(false);
    } else {
      // If not in wishlist, add it
      savedWishlist.push(id);
      localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
      setIsActive(true);
    }
  };

  return (
    <>
      {small ? (
        <button
          title="Toggle wishlist"
          onClick={handleClick}
          className="size-8 flex items-center justify-center rounded-full p-[6px] shadow-sm absolute top-3 right-3">
          <HeartIcon
            className={`${
              isActive ? "text-red-600" : "text-body opacity-25"
            } size-6`}
          />
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="btn-light bg-white border !min-h-14 !px-4 remove-from-list">
          <HeartIcon
            className={`size-6 ${
              isActive ? "text-red-600" : "text-body opacity-25"
            }`}
          />
        </button>
      )}
    </>
  );
}
