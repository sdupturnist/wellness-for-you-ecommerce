"use client";

import { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { userId } from "../Utils/UserInfo"; // Assuming userId is coming from this file
import { isLoggined } from "../Utils/checkAuth";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { useAuthContext } from "../Context/authContext";
import { apiUrl } from "../Utils/variables";

export default function AddToWishList({
  productId,
  itemName,
  small,
  activeWishlist,
  onWishlistChange,
}) {
  const router = useRouter();

  const { auth } = useAuthContext();

  const [isActive, setIsActive] = useState(activeWishlist);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch wishlist on mount or when userId changes
  // useEffect(() => {
  //   if (userId) {
  //     setIsLoading(true);
  //     fetch(`https://admin.wellness4u.in/wp-json/wishlist/v1/items?user_id=${userId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);  // Log the response to inspect it
  //         // Check if 'data' is an array
  //         if (Array.isArray(data)) {
  //           setWishlist(data);
  //           seTest(data);
  //           setIsActive(data.some(item => item.product_id === productId)); // Check if the product is in the wishlist
  //         } else {
  //           console.error("Expected an array but got:", data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, [userId, productId]);

  // Handle the click to add/remove from wishlist
  const handleClickAdd = () => {
    setIsLoading(true); // Disable button while processing

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
        setIsActive(!isActive);
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

  const handleClickRemove = () => {
    setIsLoading(true); // Disable button while processing

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
       

        setIsActive(!isActive);
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
      {small ? (
        <>
          {activeWishlist === "active" ? (
            isActive === false ? (
              <button
                title={isActive ? "Remove from wishlist" : "Add to wishlist"}
                onClick={handleClickRemove}
                disabled={isLoading}
                className="size-8 flex items-center justify-center rounded-full p-[6px] shadow-sm absolute top-3 right-3 z-10">
                {isLoading ? (
                  <Loading dot classes="size-[16px] !text-dark opacity-25" />
                ) : (
                  <HeartIcon
                    className={`${
                      activeWishlist === "active" || isActive
                        ? "text-red-500"
                        : "text-body opacity-25"
                    } size-6`}
                  />
                )}
              </button>
            ) : (
              <button
                title={isActive ? "Remove from wishlist" : "Add to wishlist"}
                onClick={handleClickRemove}
                disabled={isLoading}
                className="size-8 flex items-center justify-center rounded-full p-[6px] shadow-sm absolute top-3 right-3 z-10">
                {isLoading ? (
                  <Loading dot classes="size-[16px]  !text-dark opacity-25" />
                ) : (
                  <HeartIcon className={`text-body opacity-25 size-6`} />
                )}
              </button>
            )
          ) : (
            <button
              title={isActive ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleClickAdd}
              disabled={isLoading}
              className="size-8 flex items-center justify-center rounded-full p-[6px] shadow-sm absolute top-3 right-3 z-10">
              {isLoading ? (
                <Loading dot classes="size-[16px]  !text-dark opacity-25" />
              ) : (
                <HeartIcon
                  className={`${
                    isActive ? "text-red-500" : "text-body opacity-25"
                  } size-6`}
                />
              )}
            </button>
          )}
        </>
      ) : (
        //FOR SINGLE PAGE
        <>
          {activeWishlist === "active" ? (
            isActive === false ? (
              <button
                title={isActive ? "Remove from wishlist" : "Add to wishlist"}
                onClick={handleClickRemove}
                disabled={isLoading}
                className="btn-light bg-white border !min-h-14 !px-4 remove-from-list">
                {isLoading ? (
                  <Loading dot classes="size-[16px] !text-dark opacity-25" />
                ) : (
                  <HeartIcon
                    className={`${
                      activeWishlist === "active" || isActive
                        ? "text-red-500"
                        : "text-body opacity-25"
                    } size-6`}
                  />
                )}
              </button>
            ) : (
              <button
                title={isActive ? "Remove from wishlist" : "Add to wishlist"}
                onClick={handleClickRemove}
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
              title={isActive ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleClickAdd}
              disabled={isLoading}
              className="btn-light bg-white border !min-h-14 !px-4 remove-from-list">
              {isLoading ? (
                <Loading dot classes="size-[16px]  !text-dark opacity-25" />
              ) : (
                <HeartIcon
                  className={`${
                    isActive ? "text-red-500" : "text-body opacity-25"
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
