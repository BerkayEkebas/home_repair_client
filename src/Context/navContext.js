// src/context/NavContext.js
import React, { createContext, useContext, useState } from 'react';

// Context'i oluştur
const NavContext = createContext();

// Provider bileşeni
export const NavProvider = ({ children }) => {
  const [navInfo, setNavInfo] = useState('');

  return (
    <NavContext.Provider value={{ navInfo, setNavInfo }}>
      {children}
    </NavContext.Provider>
  );
};

// Custom hook
export const useNavContext = () => {
  return useContext(NavContext);
};
