// Single Pack,
// Buy1 Get 1Free (+₹325.00):1299

"use client";

import { useEffect, useMemo, useState } from "react";
import { useCartContext } from "../Context/cartContext";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import AddToWishList from "./AddToWishList";
import Link from "next/link";
import { apiUrl, encryptData, homeUrl, jwtTocken } from "../Utils/variables";
import Notification from "./Notification";
import Swal from "sweetalert2";
import { userId } from "../Utils/UserInfo";
import { useAuthContext } from "../Context/authContext";
import { isLoggined } from "../Utils/checkAuth";
import { useRouter } from "next/navigation";

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
  singlePage,
}) {
  const { cartItems, setCartItems, setCart, setDiscount, setCouponCode } =
    useCartContext();

  
const { auth } = useAuthContext(); // Get authentication status
const router = useRouter();



  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);

  const [isActiveWishList, setIsActiveWishList] = useState(active);
  const [loading, setLoading] = useState(true);
  const [cartAddQty, setCartAddQty] = useState(false);
  const [showGotoCartBtn, setShowGotoCartBtn] = useState(false);

  
  


  useEffect(() => {
    if (itemid) {
      setLoading(false);
    }
  }, [itemid]);
  



  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (savedWishlist.includes(itemid)) {
      setIsActiveWishList(true);
    }
  }, [itemid]);

  const safeCartItems = useMemo(
    () => (Array.isArray(cartItems) ? cartItems : []),
    [cartItems]
  );

  useEffect(() => {
    const currentItem = safeCartItems.find((item) => item.id === itemid);
    if (currentItem) {
      setQuantity(currentItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [safeCartItems, itemid]);

  useEffect(() => {
    fetch(`${apiUrl}wp-json/wishlist/v1/items?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
      } else {
        // If the response status is not OK, log failure
      }
    } catch (error) {
      // Log any error that occurred during the fetch
    }
  };

  // Function to update cart in localStorage
  const updateCartInLocalStorage = (updatedCartItems) => {
    localStorage.setItem("cart", encryptData(updatedCartItems));
    ////localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    updateCartLengthCookie(updatedCartItems); // Update cookie with cart length
  };

  // Check if item is in the cart
  const isInCart = safeCartItems.some((cartItem) => cartItem.id === itemid);

  // Function to handle cart action (Add/Remove)
  const handleCartAction = (seletedOption, image, price, name) => {
    setCartAddQty(true);

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
        price: parseInt(price),
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
        price: parseInt(price),
        name: name,
        image: image,
       // option: seletedOption || null,
        slug: slug,
      });
    }

    setCouponCode(false);
    setDiscount(0);

    setCartItems(updatedCartItems);
    updateCartInLocalStorage(updatedCartItems);

    // Update local quantity state
    setQuantity((prevQuantity) => prevQuantity + 1);

    singlePage &&
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
          localStorage.setItem("cart", encryptData(updatedCartItems));
          //localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
          updateCartLengthCookie(updatedCartItems); // Update cookie with cart length
        }
      });
  };

  const moveToWishList = (productId) => {

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
       // setIsActive(!isActive);
       // if (onWishlistChange) onWishlistChange(data);

       
      })
      .catch((error) => {
        console.error("Error updating wishlist:", error);
        alert("There was an error updating the wishlist. Please try again.");
      })
      .finally(() => {
        //setIsLoading(false); // Re-enable the button after completion
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
      {notification && (
        <Notification
          url={homeUrl + `cart`}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {card ? (
        options.length > 1 && !isInCart ? (
          <div className="dropdown dropdown-top mt-1">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1"
              onClick={toggleDropdown}>
              {isInCart ? "Remove" : "Add"}
            </div>
            {
              <ul
                tabIndex={0}
                className="dropdown-content menu card-cart-options z-[1]">
                {options?.length < 1 ? (
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
          </div>
        ) : (
          <>
            <button
              className={`${isInCart && "!bg-primary !text-white"} btn mt-3`}
              onClick={(e) => handleCartAction(name, image, price, name)}>
              {isInCart ? "Remove" : "Add"}
            </button>
          </>
        )
      ) : (
        <div className="items-end flex justify-between lg:mt-0 gap-3 w-full">
          <div
            className={`${
              !inCartPage ? "w-auto" : "w-24 sm:w-32"
            } flex items-center justify-start gap-3 lg:order-first order-last w-full`}>
            {/* FOR CART */}
            {inCartPage && (
              <div className="border-primary bg-primary-dim h-11 [&>*]:text-primary flex items-center border rounded-lg  w-full justify-between lg:max-w-40">
                <button
                  className="px-2 py-2 hover:opacity-50 transition-all text-dark"
                  onClick={CartMinus}>
                  <MinusIcon className={` size-4 font-semibold`} />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="text-center w-full !px-0 !h-full !border-none bg-primary-dim !text-primary"
                />
                <button
                  className="py-2 hover:opacity-50 transition-all text-dark px-2"
                  onClick={(e) => CartPlus(options[0]?.item || price)}>
                  <PlusIcon className="font-semibold size-4" />
                </button>
              </div>
            )}

            {/* FOR SINGLE */}

            {!inCartPage && cartAddQty && (
              <div
                className={`${
                  !inCartPage
                    ? "h-14"
                    : "border-primary bg-primary-dim h-11 [&>*]:text-primary"
                } h-14 flex items-center border rounded-lg  w-full justify-between lg:max-w-40`}>
                <button
                  className={` px-4 py-2 hover:opacity-50 transition-all text-dark`}
                  onClick={CartMinus}>
                  <MinusIcon className={` size-5 font-semibold`} />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className={` text-center w-full !px-0 !h-full !border-none`}
                />
                <button
                  className={` px-4 py-2 hover:opacity-50 transition-all text-dark`}
                  onClick={(e) => CartPlus(options[0]?.item)}>
                  <PlusIcon className={`size-5 font-semibold`} />
                </button>
              </div>
            )}

            {!inCartPage &&
              (!options.length < 1 && !isInCart ? (
                <>
                  <div className="dropdown dropdown-top sm:w-fit w-full">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn !min-h-14 px-8 sm:w-fit w-full"
                      onClick={toggleDropdown}>
                      {isInCart ? "Go to cart" : "Add to cart"}
                    </div>
                    {
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu card-cart-options z-[1]">
                        {options?.length < 1 ? (
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
                  </div>
                  <AddToWishList
activeWishlist={itemid}
itemName={name}
productId={itemid}
                  />
                </>
              ) : (
                <>
                  {options.length > 1 && (
                    <button
                      className="btn !min-h-14 px-8 w-fit"
                      onClick={() =>
                        handleCartAction(name, image, price, name)
                      }>
                      Add to cart
                    </button>
                  )}
                  {options.length < 1 && (
                    <>
                      {!isInCart && (
                        <button
                          onClick={() => {
                            handleCartAction(name, image, price, name);
                            setShowGotoCartBtn(true);
                          }}
                          className="btn !min-h-14 px-8 w-fit">
                          {isInCart ? "Go to cart" : "Add to cart"}
                        </button>
                      )}

                      {isInCart && (
                        <Link
                          href={`${homeUrl}cart`}
                          className="btn !min-h-14 px-8 w-fit">
                          Go to cart
                        </Link>
                      )}
                    </>
                  )}
                
                  <AddToWishList
                  activeWishlist={itemid}
                  itemName={name}
                  productId={itemid}
                  />
                </>
              ))}
          </div>

          {inCartPage && (
            <div className="flex justify-end relative">
              <div className="join">
              <AddToWishList
        inCartPage
        activeWishlist={itemid}
        itemName={name}
        productId={itemid}
      />  
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
