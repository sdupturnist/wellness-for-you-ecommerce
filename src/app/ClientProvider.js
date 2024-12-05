// app/ClientProvider.js
"use client";

import { useEffect, useState } from "react";
import { AuthProvider } from "./Context/authContext";
import { CartProvider } from "./Context/cartContext";
import { CheckoutProvider } from "./Context/checkoutContext";
import { SiteProvider } from "./Context/siteContext";
import useOnlineStatus from "./hooks/useOnlineStatus";
import Alerts from "./Components/Alerts";

export default function ClientProvider({ children }) {
  const isOnline = useOnlineStatus();
  const [showNoInternet, setShowNoInternet] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowNoInternet(true);
    } else {
      setShowNoInternet(false);
    }
  }, [isOnline]);

  if (showNoInternet) {
    return (
      <div class="fixed inset-0 flex items-center justify-center p-5 text-center text-xl bg-white  z-50 ">
        <Alerts
          large
          title="No Internet Connection!"
          desc="Please check your network connection and try again."
          noPageUrl
        />
      </div>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          <SiteProvider>{children}</SiteProvider>
        </CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  );
}
