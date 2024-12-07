"use client";

import { useEffect } from "react";
import { useCartContext } from "../Context/cartContext";
import AddToCart from "./AddToCart";
import Alerts from "./Alerts";
import { convertStringToJSON, currency } from "../Utils/variables";
import Link from "next/link";
import Images from "./Images";

export default function CartListItem() {
  const { cartItems, setCartItems } = useCartContext();

  // Load items from localStorage on component mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, [setCartItems]);




  return (
    <>
  <ul className="added-cart-list mb-5">
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <li key={index}>
          <div className="flex items-center justify-start w-full sm:gap-0 gap-3 mb-5 sm:mb-0">
            <Link
              className="flex items-center min-w-32"
              href={`/product/${item?.slug}`} // Assuming slug is a product-specific URL
            >
              <Images
                imageurl={item?.image}
                quality="100"
                width="100"
                height="100"
                title={item?.name || "Product"}
                alt={item?.name || "Product"}
                classes="size-[80px] sm:size-[90px] m-[15px]block mx-auto"
                placeholder={true}
              />
            </Link>
            <div className="p-5 pl-0 pr-0 w-full grid items-center">
              <Link href={`/product/${item?.slug}`}>
                <h3 className="product-title text-dark mb-2">
                  {item?.option}
                </h3>
              </Link>
              {item?.price && (
                <div>
                  <div>
                    <span className="product-price">
                      {currency}
                      {item?.price} x {item?.quantity} items
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {item && (
            <AddToCart
              inCartPage
              itemid={item?.id ?? null}
              price={item?.price && item?.price}
              name={item?.name && item?.name}
              image={item?.image && item?.image}
              options={item?.option && convertStringToJSON(item && item?.option)}
            />
          )}
        </li>
        ))
      ) : (
        <Alerts
          noPageUrl
          title="You do not have any items in your cart"
          large
        />
      )}
    </ul>
    </>
  );
}
