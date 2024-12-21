"use client";

import { useEffect } from "react";
import { useCartContext } from "../Context/cartContext";
import AddToCart from "./AddToCart";
import Alerts from "./Alerts";
import { convertStringToJSON, currency } from "../Utils/variables";
import Link from "next/link";
import Images from "./Images";

export default function CartListItem() {
  const { cartItems, setCartItems, cartListedItems } = useCartContext();

  // Load items from localStorage on component mount
  useEffect(() => {
    // Get the cart items from localStorage
    const storedItems = localStorage.getItem("cart");

    // Ensure cartItems is always an array
    setCartItems(storedItems ? JSON.parse(storedItems) : []);
  }, [setCartItems]);

  // Merge and map the cart with product details
  const mergedCart =
    Array.isArray(cartItems) &&
    cartItems.map((item) => {
      const product =
        Array.isArray(cartListedItems) &&
        cartListedItems.find((p) => p.id === item.product_id); // Find the corresponding product

      return {
        product_id: item?.product_id,
        quantity: item?.quantity,
        name: product?.name,
        slug: product?.slug,
        permalink: product?.permalink,
        price: product?.price,
        categories: product?.categories,
        image: product?.images[0]?.src, // Get the first image if available
      };
    });

  return (
    <>
      <ul className="added-cart-list mb-5">
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          mergedCart &&
          mergedCart.map((item, index) => (
            <li key={index}>
              <div className="flex items-center justify-start w-full gap-5 mb-5 lg:mb-0">
                <Link
                  className="border rounded-md flex items-center sm:h-[60px] sm:w-[60px] h-[70px] w-[70px] min-h-[70px] min-w-[70px] sm:p-3 p-1"
                  href={`/product/${item?.slug}`} // Assuming slug is a product-specific URL
                >
                  <Images
                    imageurl={item?.image}
                    quality="100"
                    width="100"
                    height="100"
                    title={item?.name || "Product"}
                    alt={item?.name || "Product"}
                    classes="size-[50px] block mx-auto object-contain"
                    placeholder={true}
                  />
                </Link>
                <div className="w-full grid items-center">
                  <Link href={`/product/${item?.slug}`}>
                    <h3 className="product-title font-semibold sm:font-medium mb-1">
                      {item?.option || item?.name}
                    </h3>
                  </Link>
                  {item?.price && (
                    <div>
                      <div>
                        <span className="product-price text-sm opacity-70">
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
                  itemid={item?.product_id ?? null}
                  price={item?.price && item?.price}
                  name={item?.name && item?.name}
                  image={item?.image && item?.image}
                  item={item?.product_id}
                  options={
                    (item?.option &&
                      convertStringToJSON(item && item?.option)) ||
                    item?.price
                  }
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
