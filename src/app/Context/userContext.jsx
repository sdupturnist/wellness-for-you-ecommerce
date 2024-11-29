// context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
 

  const [userData, setUserData] = useState([])






  return (
    <UserContext.Provider value={{ 
      userData, setUserData
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
