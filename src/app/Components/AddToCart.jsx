"use client";

import { useEffect, useMemo, useState } from "react";
import { useCartContext } from "../Context/cartContext";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import AddToWishList from "./AddToWishList";
import Link from "next/link";
import { homeUrl } from "../Utils/variables";
import Notification from "./Notification";
import Swal from "sweetalert2";

export default function AddToCart({
  itemid,
  price,
  name,
  inCartPage,
  card,
  image,
  options,
  slug,
  active,
}) {
  const { cartItems, setCartItems, setCart, setDiscount, setCouponCode } =
    useCartContext();

  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);

  const [isActiveWishList, setIsActiveWishList] = useState(active);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (savedWishlist.includes(itemid)) {
      setIsActiveWishList(true);
    }
  }, [itemid]);

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

  // Store cartItems length in the cookie
  // const updateCartLengthCookie = (updatedCartItems) => {
  //   const cartLength = updatedCartItems.length;

  //   // Update the cart length cookie via the POST API route
  //   fetch(`${homeUrl}api/setCookie/cart-length`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ cartItemsLength: cartLength }),
  //   });
  // };

  const updateCartLengthCookie = async (updatedCartItems) => {
    const cartLength = updatedCartItems.length;

    try {
      const response = await fetch(`${homeUrl}api/setCookie/cart-length`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemsLength: cartLength }),
      });

      if (response.ok) {
        // Successfully updated cart length in cookie
        const data = await response.json();
        console.log("Success:", data.message); // Log success message from response
      } else {
        // If the response status is not OK, log failure
        console.log("Error: Failed to update cart length", response.statusText);
      }
    } catch (error) {
      // Log any error that occurred during the fetch
      console.log("Request failed with error:", error);
    }
  };

  // Function to update cart in localStorage
  const updateCartInLocalStorage = (updatedCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    updateCartLengthCookie(updatedCartItems); // Update cookie with cart length
  };

  // Check if item is in the cart
  const isInCart = safeCartItems.some((cartItem) => cartItem.id === itemid);

  // Function to handle cart action (Add/Remove)
  const handleCartAction = (seletedOption, image, price, name) => {
    if (isInCart) {
      // Remove item from cart
      const updatedCartItems = safeCartItems.filter(
        (cartItem) => cartItem.id !== itemid
      );

      setCouponCode(false);
      setDiscount(0);

      setCartItems(updatedCartItems);
      updateCartInLocalStorage(updatedCartItems);
    } else {
      // Add item to cart
      const newObject = {
        id: itemid,
        product_id: itemid,
        quantity: 1,
        price: price,
        name: name,
        image: image,
        option: seletedOption || null,
        slug: slug,
      };

      const updatedCartItems = [...safeCartItems, newObject];
      setCartItems(updatedCartItems);
      setDiscount(0);

      updateCartInLocalStorage(updatedCartItems);

      setNotification({
        message: `Item added to your cart.`,
        type: "success",
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  // Function to increase item quantity
  const CartPlus = (seletedOption) => {
    const updatedCartItems = safeCartItems.map((item) =>
      item.id === itemid
        ? { ...item, quantity: item.quantity + 1 } // Increase quantity
        : item
    );

    // If item does not exist, add it with quantity 1
    if (!updatedCartItems.some((item) => item.id === itemid)) {
      updatedCartItems.push({
        id: itemid,
        product_id: itemid,
        quantity: 1,
        price: price,
        name: name,
        image: image,
        option: seletedOption || null,
        slug: slug,
      });
    }

    setCouponCode(false);
    setDiscount(0);

    setCartItems(updatedCartItems);
    updateCartInLocalStorage(updatedCartItems);

    // Update local quantity state
    setQuantity((prevQuantity) => prevQuantity + 1);

    setNotification({
      message: `Item added to your cart.`,
      type: "success",
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
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
        setCouponCode(false);
        setDiscount(0);

        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);
        setQuantity((prevQuantity) => prevQuantity - 1);
      } else {
        // Remove item if quantity is 1
        const updatedCartItems = safeCartItems.filter(
          (item) => item.id !== itemid
        );
        setCartItems(updatedCartItems);
        // updateCartInLocalStorage(updatedCartItems);
        setQuantity(0);
        setDiscount(0);
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const removeFromCartConfirm = (id, name) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-light",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `Do you need to remove ${name} item from the list?`,
        icon: false,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const updatedCartItems = cartItems.filter((item) => item.id !== id);
          setCartItems(updatedCartItems);
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
          updateCartLengthCookie(updatedCartItems); // Update cookie with cart length
        }
      });
  };

  const moveToWishList = (id, name) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-light",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `Do you need to move ${name} item to the wishlist?`,
        icon: false,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          //TO WISH LIST
          const savedWishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

          if (isActiveWishList) {
            // If already in wishlist, remove it
            const updatedWishlist = savedWishlist.filter(
              (itemId) => itemId !== id
            );
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            setIsActiveWishList(false);
          } else {
            // If not in wishlist, add it
            savedWishlist.push(id);
            localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
            setIsActiveWishList(true);
          }

          //REMOVED FROM CART
          const updatedCartItems = cartItems.filter((item) => item.id !== id);
          setCartItems(updatedCartItems);
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
          updateCartLengthCookie(updatedCartItems); // Update cookie with cart length
        }
      });
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {card ? (
        options && !isInCart ? (
          <details className="dropdown mt-1">
            <summary className="btn m-1" onClick={toggleDropdown}>
              {isInCart ? "Remove" : "Add"}
            </summary>
            {
              <ul className="menu card-cart-options">
                {options?.length === 0 ? (
                  <li>
                    <button
                      onClick={() =>
                        handleCartAction(name, image, price, name)
                      }>
                      Regular
                    </button>
                  </li>
                ) : (
                  options.map((item, index) => (
                    <li key={index} onClick={closeDropdown}>
                      <button
                        onClick={() =>
                          handleCartAction(
                            item?.option || name,
                            item?.image || image,
                            item?.price || price,
                            name + " - " + item?.item || name
                          )
                        }>
                        {item?.item}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            }
          </details>
        ) : (
          <>
            <button
              className={`${isInCart && "!bg-primary !text-white"} btn mt-3`}
              onClick={(e) => handleCartAction(null)}>
              {isInCart ? "Remove" : "Add"}
            </button>
          </>
        )
      ) : (
        <div className="items-end flex justify-between lg:mt-0 mt-4 gap-3">
          <div
            className={`${
              !inCartPage ? "w-auto" : "w-24 sm:w-32"
            } flex items-center justify-start gap-3 lg:order-first order-last`}>
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
                  className={`${
                    !inCartPage ? "size-5" : "size-4"
                  } font-semibold`}
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
                onClick={(e) => CartPlus(options[0]?.item)}>
                <PlusIcon
                  className={`${
                    !inCartPage ? "size-5" : "size-4"
                  } font-semibold`}
                />
              </button>
            </div>
            {!inCartPage &&
              (options && !isInCart ? (
                <>
                  <details className="dropdown mt-1">
                    <summary
                      className="btn !min-h-14 px-8"
                      onClick={toggleDropdown}>
                      {isInCart ? "Go to cart" : "Add to cart"}
                    </summary>
                    {
                      <ul className="menu card-cart-options">
                        {options?.length === 0 ? (
                          <li>
                            <button
                              onClick={() =>
                                handleCartAction(name, image, price, name)
                              }>
                              Regular
                            </button>
                          </li>
                        ) : (
                          options.map((item, index) => (
                            <li key={index} onClick={closeDropdown}>
                              <button
                                onClick={() =>
                                  handleCartAction(
                                    item?.option || name,
                                    item?.image || image,
                                    item?.price || price,
                                    name + " - " + item?.item || name
                                  )
                                }>
                                {item?.item}
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    }
                  </details>
                  <AddToWishList id={itemid} />
                </>
              ) : (
                <>
                  <Link href={`${homeUrl}cart`} className="btn !min-h-14 px-8">
                    {isInCart ? "Go to cart" : "Add to cart"}
                  </Link>
                  <AddToWishList id={itemid} />
                </>
              ))}
          </div>

          {inCartPage && (
            <div className="flex justify-end">
              <div className="join">
                <button
                  className="join-item option-btn"
                  onClick={() => moveToWishList(itemid, name)}>
                  Move to wishlist
                </button>
                <button
                  className="join-item option-btn"
                  onClick={() => removeFromCartConfirm(itemid, name)}>
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
