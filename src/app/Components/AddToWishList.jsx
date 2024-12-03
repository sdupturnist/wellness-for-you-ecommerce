"use client";

import { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { apiUrl, woocommerceKey } from "../Utils/variables";

export default function AddToWishList({ productId, itemName, small, activeWishlist, onWishlistChange }) {
  // Mocked user info. In a real app, this would be dynamically fetched.
  const userInfo = {
    id: 2,
    name: "Anjali",
    email: "upturnistuae@gmail.com",
    phone: "911234567890",
  };

  const [wishlist, setWishlist] = useState([]); // Store the wishlist items
  const [items, setItems] = useState([]); // Store product data for wishlist items
  const [isActive, setIsActive] = useState(activeWishlist); // Tracks if the current product is in the wishlist
  const [action, setAction] = useState(null);

  // Fetch wishlist items for the user
  useEffect(() => {
    fetch(`${apiUrl}wp-json/wishlist/v1/items?user_id=${userInfo?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Check if the product is in the wishlist
  const isProductInWishlist = wishlist.includes(productId); // This will now work because wishlist is an array

  // Click handler to toggle between adding/removing the product
  const handleClick = () => {
    // Check if product is in the wishlist and decide to add/remove
    const actionType = isProductInWishlist ? "remove" : "add"; // If product is in the wishlist, remove it; otherwise, add it
    setIsActive(!isProductInWishlist); // Toggle the active state

    // Set action data to trigger the API call
    setAction({
      productId,
      userId: userInfo.id,
      actionType,
    });
  };

  // Trigger API call when the action state changes (add/remove product)
  useEffect(() => {
    if (action) {
      const { productId, userId, actionType } = action;
      const url =
        actionType === "remove"
          ? `${apiUrl}wp-json/wishlist/v1/remove`
          : `${apiUrl}wp-json/wishlist/v1/add`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(`Product ${actionType === "remove" ? "removed" : "added"}:`, data);

          // Notify the parent component to update the wishlist state if necessary
          if (onWishlistChange) {
            onWishlistChange(productId, actionType === "add");
          }

          // Update the local wishlist state after adding/removing
          setWishlist((prevWishlist) => {
            if (actionType === "add") {
              return [...prevWishlist, productId]; // Add the product to wishlist
            } else {
              return prevWishlist.filter((id) => id !== productId); // Remove the product from wishlist
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("There was an error updating the wishlist. Please try again.");
        });
    }
  }, [action]);

  return (
    <>
      {small ? (
        <button
          title={isActive ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleClick}
          className="size-8 flex items-center justify-center rounded-full p-[6px] shadow-sm absolute top-3 sm:right-3 right-0 z-10"
        >
          <HeartIcon
            className={`${
              isProductInWishlist ? "text-red-600" : "text-body opacity-25"
            } size-6`} // Red color if product is in wishlist
          />
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="btn-light bg-white border !min-h-14 !px-4 remove-from-list"
        >
          <HeartIcon
            className={`size-6 ${
              isProductInWishlist ? "text-red-600" : "text-body opacity-25"
            }`} // Red color if product is in wishlist
          />
        </button>
      )}
    </>
  );
}
