// context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
 
    const [billingAddress, setBillingAddress] = useState([])
    const [showAddNewAddress, setShowAddNewAddress] = useState(false)

  return (
    <UserContext.Provider value={{ 
        billingAddress,
         setBillingAddress,
         showAddNewAddress, 
         setShowAddNewAddress
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
