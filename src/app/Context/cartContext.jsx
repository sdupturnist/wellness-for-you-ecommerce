import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [couponCode, setCouponCode] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponData, setCouponData] = useState([]);

  // Load cartItems from localStorage when the component mounts (or updates cartItems)
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);

    const subTotal = storedCartItems.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);

    setCartSubTotal(subTotal);
  }, []); // Only run once on initial mount

  // Synchronize localStorage with cartItems dynamically on any update
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update localStorage whenever cartItems changes
    }
  }, [cartItems]); // Effect triggers when cartItems changes

  const addToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  // Update subtotal when cartItems change
  useEffect(() => {
    const subTotal = cartItems.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);
    setCartSubTotal(subTotal);
  }, [cartItems]); // Recalculate subtotal every time cartItems changes

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
         setCouponData
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
