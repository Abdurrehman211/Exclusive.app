// src/context/CartCouter.js
import React, { createContext, useState } from 'react';

export const CartCounterContext = createContext();

export const CartCounterProvider = ({ children }) => {
  const [cartCounter, setCartCounter] = useState(0);

  return (
    <CartCounterContext.Provider value={{ cartCounter, setCartCounter }}>
      {children}
    </CartCounterContext.Provider>
  );
};
