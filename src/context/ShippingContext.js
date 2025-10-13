import React, { createContext, useState } from "react";

const defaultInfo = {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '', 
    city: '',
    state: '',
    zip: ''
}

export const ShippingContext = createContext();

export const ShippingProvider = ({ children }) => {
  const [shippingData, setShippingData] = useState(defaultInfo);

  return (
    <ShippingContext.Provider value={{ shippingData, setShippingData }}>
      {children}
    </ShippingContext.Provider>
  );
};
