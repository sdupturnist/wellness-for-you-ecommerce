"use client";

import { useEffect, useMemo, useState } from "react";
import { useCartContext } from "../Context/cartContext";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import AddToWishList from "./AddToWishList";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { homeUrl } from "../Utils/variables";

export default function AddToCart({ itemid, price, name, inCartPage, card, image }) {
  const router = useRouter();

  const { cartItems, setCartItems, setCart } = useCartContext();

  const [quantity, setQuantity] = useState(1);

  // Memoize safeCartItems to avoid unnecessary recalculations
  const safeCartItems = useMemo(
    () => (Array.isArray(cartItems) ? cartItems : []),
    [cartItems]
  );

  // Effect hook to sync quantity with cartItems
  useEffect(() => {
    const currentItem = safeCartItems.find((item) => item.id === itemid);
    if (currentItem) {
      setQuantity(currentItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [safeCartItems, itemid]);

  // Function to update cart in localStorage
  const updateCartInLocalStorage = (updatedCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Check if item is in the cart
  const isInCart = safeCartItems.some((cartItem) => cartItem.id === itemid);

  // Function to handle cart action (Add/Remove)
  const handleCartAction = () => {
    if (isInCart) {
      // Remove item from cart
      const updatedCartItems = safeCartItems.filter(
        (cartItem) => cartItem.id !== itemid
      );
      setCartItems(updatedCartItems);
      updateCartInLocalStorage(updatedCartItems);
    } else {
      // Add item to cart
      const newObject = { id: itemid, quantity: 1, price: price, name: name, image: image };
      const updatedCartItems = [...safeCartItems, newObject];
      setCartItems(updatedCartItems);
      updateCartInLocalStorage(updatedCartItems);
    }
  };

  // Function to increase item quantity
  const CartPlus = () => {
    const updatedCartItems = safeCartItems.map((item) =>
      item.id === itemid
        ? { ...item, quantity: item.quantity + 1 } // Increase quantity
        : item
    );

    // If item does not exist, add it with quantity 1
    if (!updatedCartItems.some((item) => item.id === itemid)) {
      updatedCartItems.push({
        id: itemid,
        quantity: 1,
        price: price,
        name: name,
        image: image,
      });
    }

    setCartItems(updatedCartItems);
    updateCartInLocalStorage(updatedCartItems);

    // Update local quantity state
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrease item quantity
  const CartMinus = () => {
    const itemInCart = safeCartItems.find((item) => item.id === itemid);

    if (itemInCart) {
      if (itemInCart.quantity > 1) {
        // Update quantity if greater than 1
        const updatedCartItems = safeCartItems.map((item) =>
          item.id === itemid
            ? { ...item, quantity: item.quantity - 1 } // Decrease quantity
            : item
        );
        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);
        setQuantity((prevQuantity) => prevQuantity - 1);
      } else {
        // Remove item if quantity is 1
        const updatedCartItems = safeCartItems.filter(
          (item) => item.id !== itemid
        );
        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);
        setQuantity(0);
      }
    }
  };

  return (
    <>
      {card ? (
        <button
          className={`${isInCart && "!bg-primary !text-white"} btn mt-3`}
          onClick={handleCartAction}>
          {isInCart ? "Remove" : "Add"}
        </button>
      ) : (
        <div
          className={`${
            !inCartPage ? "w-auto" : "w-24 sm:w-32"
          } flex items-center justify-start gap-3`}>
          <div
            className={`${
              !inCartPage
                ? "h-14"
                : "border-primary bg-primary-dim h-11 [&>*]:text-primary"
            } flex items-center border rounded-lg  w-full justify-between lg:max-w-40`}>
            <button
              className={`${
                inCartPage ? "px-2" : "px-4"
              } py-2 hover:opacity-50 transition-all text-dark`}
              onClick={CartMinus}>
              <MinusIcon
                className={`${!inCartPage ? "size-5" : "size-4"} font-semibold`}
              />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className={`${
                inCartPage && "bg-primary-dim !text-primary"
              } text-center w-full !px-0 !h-full !border-none`}
            />
            <button
              className={`${
                inCartPage ? "px-2" : "px-4"
              } py-2 hover:opacity-50 transition-all text-dark`}
              onClick={CartPlus}>
              <PlusIcon
                className={`${!inCartPage ? "size-5" : "size-4"} font-semibold`}
              />
            </button>
          </div>
          {!inCartPage && (
            <>
              <Link
                href={`${homeUrl}cart`}
                className="btn !min-h-14"
                onClick={handleCartAction}>
                Add to cart
              </Link>
              <AddToWishList
                id={itemid}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
