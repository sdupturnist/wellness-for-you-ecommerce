import { createContext, useContext, useEffect, useState } from "react";
import {
  apiUrl,
  decryptData,
  encryptData,
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

  // Load cartItems from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = decryptData(localStorage.getItem("cart")) || [];
      setCartItems(storedCartItems);
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  // Fetch product data whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      const productIds = cartItems.map((product) => product.product_id).join(",");
      fetch(`${apiUrl}wp-json/wc/v3/products${woocommerceKey}&include=${productIds}`)
        .then((res) => res.json())
        .then((data) => {
          setCartListedItems(data);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [cartItems]); // This effect runs when cartItems changes

  // Calculate the subtotal and shipping charge
  useEffect(() => {
    if (cartListedItems.length > 0 && cartItems.length > 0) {
      const filteredData = cartListedItems
        .map((product) => {
          const cartItem = cartItems.find((item) => item.product_id === product.id);
          if (cartItem) {
            const price = parseFloat(product.price);
            return {
              ...product,
              totalPrice: price * cartItem.quantity,
              quantity: cartItem.quantity,
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      const subtotal = filteredData.reduce((total, item) => total + item.totalPrice, 0);
      setCartSubTotal(subtotal);

      // Check shipping charge based on subtotal
      setHaveShippingCharge(subtotal < shippingChargeLimit);
    }
  }, [cartListedItems, cartItems]); // This effect depends on both cartItems and cartListedItems

  // Update localStorage whenever cartItems change
  useEffect(() => {
    if (typeof window !== "undefined" && cartItems.length > 0) {
      localStorage.setItem("cart", encryptData(cartItems));
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
