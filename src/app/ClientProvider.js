// app/ClientProvider.js
"use client";

import { CartProvider } from "./Context/cartContext";
import { CheckoutProvider } from "./Context/checkoutContext";
import { SiteProvider } from "./Context/siteContext";
import { UserProvider } from "./Context/userContext";

export default function ClientProvider({ children }) {
  return (
 
      <UserProvider>
        <CartProvider>
          <CheckoutProvider>
          <SiteProvider>
            {children}
            </SiteProvider>
            </CheckoutProvider>
        </CartProvider>
      </UserProvider>
    
  );
}
