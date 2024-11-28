// context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
 

  const [test, setTest] = useState('')





  return (
    <UserContext.Provider value={{ 
      test, setTest
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
