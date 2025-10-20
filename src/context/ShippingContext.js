import React, { createContext, useState, useEffect } from "react";

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

function initShipping() {
  try {
    const parsedData = JSON.parse(localStorage.getItem('shippingData'));
    if (parsedData && typeof parsedData == "object") {
      return parsedData;
    }
  } catch (error) {
    console.error("Error initializing shipping data:", error);
  }
  return defaultInfo;
}

export const ShippingProvider = ({ children }) => {
  const [shippingData, setShippingData] = useState(() => initShipping());

  useEffect(() => {
    try {
      // check if shipping data exists in localStorage, load it, else set to default
      const isEmpty = Object.values(shippingData).every(value => (value ?? "") === "");
      if (isEmpty) {
        localStorage.removeItem('shippingData');
      } else {
        // save shipping data to localStorage
        localStorage.setItem('shippingData', JSON.stringify(shippingData));
      }
    } catch (error) {
      console.error("Error saving shipping data:", error);
    }
  }, [shippingData]);
  return (
    <ShippingContext.Provider value={{ shippingData, setShippingData }}>
      {children}
    </ShippingContext.Provider>
  );
};
