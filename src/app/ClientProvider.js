// app/ClientProvider.js
'use client';

import { CartProvider } from "./Context/cartContext";






export default function ClientProvider({ children }) {
  return (
    <CartProvider>
      {children}
      </CartProvider>
  );
}
