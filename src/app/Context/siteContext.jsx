// context/SiteContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {

  const [editData, setEditData] = useState(null);

  return (
    <SiteContext.Provider value={{ 
      
      editData, setEditData
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  return useContext(SiteContext);
};
