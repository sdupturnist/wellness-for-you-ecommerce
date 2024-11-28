// context/PaymentContext.js

import React, { createContext, useState, useContext } from "react";

// Create the context for payment status
const PaymentContext = createContext();

// PaymentContext provider component
export const PaymentProvider = ({ children }) => {


  const [paymentStatus, setPaymentStatus] = useState(null);
 

  // Function to update payment status
  const updatePaymentStatus = (status) => {
    setPaymentStatus(status);
  };

  return (
    <PaymentContext.Provider value={{ paymentStatus, updatePaymentStatus }}>
      {children}
    </PaymentContext.Provider>
  );
};

// Custom hook to use the payment context
export const usePayment = () => useContext(PaymentContext);
