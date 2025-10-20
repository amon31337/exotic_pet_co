import React, { createContext, useState, useEffect } from "react";



const defaultInfo = {
    cardNumber: '',
    expirationDate: '',
    cvvCode: '',
    cardHolderName: '', 
    zipCode: ''
}

export const PaymentContext = createContext();

function initPayment() {
  try {
    const parsedData = JSON.parse(localStorage.getItem('paymentData'));
    if (parsedData && typeof parsedData == "object") {
      return parsedData;
    }
  } catch (error) {
    console.error("Error initializing payment data:", error);
  }
  return defaultInfo;
}

export const PaymentProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState(() => initPayment());

  useEffect(() => {
    try {
      // check if payment data exists in localStorage, load it, else set to default
      const isEmpty = Object.values(paymentData).every(value => (value ?? "") === "");
      if (isEmpty) {
        localStorage.removeItem('paymentData');
      } else {
        // save payment data to localStorage
        localStorage.setItem('paymentData', JSON.stringify(paymentData));
      }
    } catch (error) {
      console.error("Error saving payment data:", error);
    }
  }, [paymentData]);

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
};
