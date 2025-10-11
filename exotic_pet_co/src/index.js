import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Purchase from './components/purchase';
import Confirmation from './components/confirmation';
import PaymentEntry from './components/paymentEntry';
import ShippingEntry from './components/shippingEntry';
import ViewOrder from './components/viewOrder';
import { CartProvider } from "./context/CartContext";

import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/purchase" />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/purchase/viewOrder" element={<ViewOrder />} />
            <Route path="/purchase/paymentEntry" element={<PaymentEntry />} />
            <Route path="/purchase/shippingEntry" element={<ShippingEntry />} />
            <Route path="/purchase/confirmation" element={<Confirmation />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
