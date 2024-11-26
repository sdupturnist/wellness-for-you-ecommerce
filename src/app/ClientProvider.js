// app/ClientProvider.js
"use client";

import { CartProvider } from "./Context/cartContext";
import { CheckoutProvider } from "./Context/checkoutContext";

export default function ClientProvider({ children }) {
  return (
    <CartProvider>
      <CheckoutProvider>{children}</CheckoutProvider>
    </CartProvider>
  );
}
