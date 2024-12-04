// app/ClientProvider.js
"use client";

import { AuthProvider } from "./Context/authContext";
import { CartProvider } from "./Context/cartContext";
import { CheckoutProvider } from "./Context/checkoutContext";
import { SiteProvider } from "./Context/siteContext";


export default function ClientProvider({ children }) {



  return (
 <AuthProvider>
        <CartProvider>
          <CheckoutProvider>
          <SiteProvider>
            {children}
            </SiteProvider>
            </CheckoutProvider>
        </CartProvider>
 </AuthProvider>
    
  );
}
