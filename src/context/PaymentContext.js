import React, { createContext, useState } from "react";

const defaultInfo = {
    cardNumber: '',
    expirationDate: '',
    cvvCode: '',
    cardHolderName: '', 
    zipCode: ''
}

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState(defaultInfo);

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
};
