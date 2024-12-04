// app/ClientProvider.js
"use client";

import { AuthProvider } from "./Context/authContext";
import { CartProvider } from "./Context/cartContext";
import { CheckoutProvider } from "./Context/checkoutContext";
import { SiteProvider } from "./Context/siteContext";
import { UserProvider, useUserContext } from "./Context/userContext";


export default function ClientProvider({ children }) {



  return (
 <AuthProvider>
      <UserProvider>
        <CartProvider>
          <CheckoutProvider>
          <SiteProvider>
            {children}
            </SiteProvider>
            </CheckoutProvider>
        </CartProvider>
      </UserProvider>
 </AuthProvider>
    
  );
}
