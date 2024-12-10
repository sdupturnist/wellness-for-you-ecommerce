import { createContext, useContext, useEffect, useState } from "react";
import {
  apiUrl,
  decryptData,
  encryptData,
  shippingCharge,
  shippingChargeLimit,
  woocommerceKey,
} from "../Utils/variables";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [couponCode, setCouponCode] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponData, setCouponData] = useState([]);
  const [guestUser, setGuestUser] = useState(false);
  const [guestUserData, setGuestUserData] = useState(null);
  const [guestUserDataValidation, setGuestUserDataValidation] = useState(false);
  const [cartListedItems, setCartListedItems] = useState([]);
  const [haveShippingCharge, setHaveShippingCharge] = useState(0);

  // Load cartItems from localStorage when the component mounts (or updates cartItems)
  useEffect(() => {
    // Only run in the browser (client-side)
    if (typeof window !== "undefined") {
      //  const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const storedCartItems =
        (localStorage.getItem("cart") &&
          decryptData(localStorage.getItem("cart"))) ||
        [];
      setCartItems(storedCartItems);

      const productIds = storedCartItems
        .map((product) => product.product_id)
        .join(",");

      fetch(
        `${apiUrl}wp-json/wc/v3/products${woocommerceKey}&include=${productIds}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCartListedItems(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      const filteredData = cartListedItems
        .map((product) => {
          const cartItem = cartItems.find(
            (item) => item.product_id === product.id
          );
          if (cartItem) {
            const price = parseFloat(product.price);

            return {
              ...product,
              totalPrice: price * cartItem.quantity, // price from productData
              quantity: cartItem.quantity,
            };
          }
          return null;
        })
        .filter((item) => item !== null); // Remove any null values

      const subtotal = filteredData.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      // console.log("Filtered Product Data:", filteredData);
      //console.log("Subtotal:", subtotal);

      setCartSubTotal(subtotal);

      //CHECK SHIPPING CHARGE
      setHaveShippingCharge(shippingChargeLimit > subtotal ? true : false);
    }
  }, [cartListedItems]);

  useEffect(() => {
    if (typeof window !== "undefined" && cartItems.length > 0) {
      localStorage.setItem("cart", encryptData(cartItems));
      ///localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update localStorage whenever cartItems changes
    }
  }, [cartItems]);

  const addToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };




  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartItems,
        setCartItems,
        cartSubTotal,
        setCartSubTotal,
        couponCode,
        setCouponCode,
        discount,
        setDiscount,
        addToCart,
        removeFromCart,
        cartTotal,
        setCartTotal,
        couponData,
        setCouponData,
        guestUser,
        setGuestUser,
        guestUserData,
        setGuestUserData,
        guestUserDataValidation,
        setGuestUserDataValidation,
        cartListedItems,
        setCartListedItems,
        haveShippingCharge,
        setHaveShippingCharge,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
