// app/ClientProvider.js
"use client";

import { CartProvider } from "./Context/cartContext";
import { CheckoutProvider } from "./Context/checkoutContext";
import { PaymentProvider } from "./Context/PaymentContext";
import { SiteProvider } from "./Context/siteContext";
import { UserProvider } from "./Context/userContext";

export default function ClientProvider({ children }) {
  return (
 
      <UserProvider>
        <CartProvider>
          <CheckoutProvider>
          <SiteProvider>
          <PaymentProvider>
            {children}
            </PaymentProvider>
            </SiteProvider>
            </CheckoutProvider>
        </CartProvider>
      </UserProvider>
    
  );
}
