// context/CheckoutContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';


const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
 
    const [amountToPay, setAmountToPay] = useState(0)

  return (
    <CheckoutContext.Provider value={{ 
        amountToPay, 
        setAmountToPay
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
