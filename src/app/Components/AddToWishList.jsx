"use client";

import { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { userId } from "../Utils/UserInfo"; // Assuming userId is coming from this file
import { isLoggined } from "../Utils/checkAuth";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { useAuthContext } from "../Context/authContext";
import { apiUrl } from "../Utils/variables";
import { useSiteContext } from "../Context/siteContext";

export default function AddToWishList({
  productId,
  itemName,
  small,
  onWishlistChange,
  inCartPage,
  hideRemovedItem
}) {
  const router = useRouter();

  const { auth } = useAuthContext();

  const { activeWishlist, setHideCartItem } = useSiteContext();

  const [isLoading, setIsLoading] = useState(false);

  const wishlistItems =
    JSON.parse(sessionStorage.getItem("wishlist_data")) ||
    (activeWishlist);

  // Handle the click to add/remove from wishlist
  const handleClickAdd = (userId, productId) => {
    if (!auth) {
      isLoggined(
        auth,
        router,
        null,
        "Login to Add to Wishlist",
        "Please log in to your account to add this item to your wishlist."
      );
      return false;
    }

    setIsLoading(true); // Disable button while processing
    fetch(`${apiUrl}wp-json/wishlist/v1/add`, {
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
        let wishlist =
          JSON.parse(sessionStorage.getItem("wishlist_data")) || {};

        let nextKey = Object.keys(wishlist).length;

        wishlist[nextKey] = productId;

        const filteredWishlist = wishlist.filter(item => item !== null);

// Store the filtered wishlist in sessionStorage
sessionStorage.setItem("wishlist_data", JSON.stringify(filteredWishlist));

        if (onWishlistChange) onWishlistChange(data);
      })
      .catch((error) => {
        console.error("Error updating wishlist:", error);
        alert("There was an error updating the wishlist. Please try again.");
      })
      .finally(() => {
        setIsLoading(false); // Re-enable the button after completion
      });
  };

  const handleClickRemove = (userId, productId) => {
    if (!auth) {
      isLoggined(
        auth,
        router,
        null,
        "Login to Add to Wishlist",
        "Please log in to your account to add this item to your wishlist."
      );
      return false;
    }

    setIsLoading(true);



    fetch(`${apiUrl}wp-json/wishlist/v1/remove`, {
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
        // Retrieve the current wishlist from sessionStorage
        let wishlist =
          JSON.parse(sessionStorage.getItem("wishlist_data")) || {};


         // setHideCartItem(true)

          setHideCartItem((prevState) => ({
            ...prevState,
            [productId]: true, // Hide this product
          }));



        // Find the key that corresponds to the productId and remove it
        for (let key in wishlist) {
          if (wishlist[key] === productId) {
            delete wishlist[key]; // Remove the productId from the wishlist
            break; // Exit the loop after deleting the productId
          }
        }

        // Update the sessionStorage with the modified wishlist
        sessionStorage.setItem("wishlist_data", JSON.stringify(wishlist));

        if (onWishlistChange) onWishlistChange(data);

       
      })
      .catch((error) => {
        console.error("Error updating wishlist:", error);
        alert("There was an error updating the wishlist. Please try again.");
      })
      .finally(() => {
        setIsLoading(false); // Re-enable the button after completion
      });
  };

  return (
    <>
      {inCartPage && (
        <>
          {Object.values(wishlistItems).includes(productId) === productId ? (
            wishlistItems === false ? (
              <button
                title={
                  wishlistItems &&
                  Object.values(wishlistItems).includes(productId) ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={() => handleClickRemove(userId, productId)}
                disabled={isLoading}
                className="join-item option-btn">
                {isLoading ? (
                  <Loading dot classes="size-[16px] !text-dark opacity-25" />
                ) : (
                  wishlistItems &&
                  Object.values(wishlistItems).includes(productId) ? "Remove from wishlist" : "Add to wishlist"
                )}
              </button>
            ) : (
              <button
                title={
                  wishlistItems === "active"
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                onClick={() => handleClickRemove(userId, productId)}
                disabled={isLoading}
                className="join-item option-btn">
                {isLoading ? (
                  <Loading dot classes="size-[16px] !text-dark opacity-25" />
                ) : (
                  wishlistItems &&
                  Object.values(wishlistItems).includes(productId) ? "Remove from wishlist" : "Add to wishlist"
                )}
              </button>
            )
          ) : (
            <button
              title={
                wishlistItems === "active"
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              onClick={() => handleClickAdd(userId, productId)}
              disabled={isLoading}
              className="join-item option-btn">
              {isLoading ? (
                <Loading dot classes="size-[16px] !text-dark opacity-25" />
              ) : (
                wishlistItems &&
                Object.values(wishlistItems).includes(productId) ? "Remove from wishlist" : "Add to wishlist"
              )}
            </button>
          )}
        </>
      )}
      {!inCartPage && small && (
        <>
          {wishlistItems && Object.values(wishlistItems).includes(productId) ? (
            <button
              title={
                wishlistItems &&
                Object.values(wishlistItems).includes(productId)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              onClick={() => handleClickRemove(userId, productId)}
              disabled={isLoading}
              className="size-8 flex items-center justify-center rounded-full p-[6px] shadow-sm absolute top-3 right-3 z-1">
              {isLoading ? (
                <Loading dot classes="size-[16px] !text-dark opacity-25" />
              ) : (
                <HeartIcon
                  className={`${
                    wishlistItems &&
                    Object.values(wishlistItems).includes(productId)
                      ? "text-red-500"
                      : "text-body opacity-25"
                  } size-6`}
                />
              )}
            </button>
          ) : (
            <button
              title={
                wishlistItems &&
                Object.values(wishlistItems).includes(productId)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              onClick={() => handleClickAdd(userId, productId)}
              disabled={isLoading}
              className="size-8 flex items-center justify-center rounded-full p-[6px] shadow-sm absolute top-3 right-3 z-1">
              {isLoading ? (
                <Loading dot classes="size-[16px]  !text-dark opacity-25" />
              ) : (
                <HeartIcon
                  className={`${
                    wishlistItems &&
                    Object.values(wishlistItems).includes(productId)
                      ? "text-red-500"
                      : "text-body opacity-25"
                  } size-6`}
                />
              )}
            </button>
          )}
        </>
      )}

      {!inCartPage && !small && (
        //FOR SINGLE PAGE
        <>
          {wishlistItems && Object.values(wishlistItems).includes(productId)  ? (
            wishlistItems && Object.values(wishlistItems).includes(productId)  ? (
              <button
                title={
                  wishlistItems && Object.values(wishlistItems).includes(productId) 
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                onClick={() => handleClickRemove(userId, productId)}
                disabled={isLoading}
                className="btn-light bg-white border !min-h-14 !px-4 remove-from-list">
                {isLoading ? (
                  <Loading dot classes="size-[16px] !text-dark opacity-25" />
                ) : (
                  <HeartIcon
                    className={`${
                      wishlistItems && Object.values(wishlistItems).includes(productId) 
                        ? "text-red-500"
                        : "text-body opacity-25"
                    } size-6`}
                  />
                )}
              </button>
            ) : (
              <button
                title={
                  wishlistItems && Object.values(wishlistItems).includes(productId) 
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                onClick={() => handleClickRemove(userId, productId)}
                disabled={isLoading}
                className="btn-light bg-white border !min-h-14 !px-4 remove-from-list">
                {isLoading ? (
                  <Loading dot classes="size-[16px]  !text-dark opacity-25" />
                ) : (
                  <HeartIcon className={`text-body opacity-25 size-6`} />
                )}
              </button>
            )
          ) : (
            <button
              title={
                wishlistItems && Object.values(wishlistItems).includes(productId) 
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              onClick={() => handleClickAdd(userId, productId)}
              disabled={isLoading}
              className="btn-light bg-white border !min-h-14 !px-4 remove-from-list">
              {isLoading ? (
                <Loading dot classes="size-[16px]  !text-dark opacity-25" />
              ) : (
                <HeartIcon
                  className={`${
                    wishlistItems && Object.values(wishlistItems).includes(productId) 
                      ? "text-red-500"
                      : "text-body opacity-25"
                  } size-6`}
                />
              )}
            </button>
          )}
        </>
      )}
    </>
  );
}
