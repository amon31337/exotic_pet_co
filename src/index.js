import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Purchase from './components/purchase';
import Confirmation from './components/confirmation';
import PaymentEntry from './components/paymentEntry';
import ShippingEntry from './components/shippingEntry';
import ViewOrder from './components/viewOrder';
import { CartProvider } from "./context/CartContext";
import { PaymentProvider } from './context/PaymentContext';
import { ThemeProvider } from "./context/ThemeContext";
import { ShippingProvider } from './context/ShippingContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <PaymentProvider>
          <ShippingProvider>
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
          </ShippingProvider>
        </PaymentProvider>
      </CartProvider>
    </ThemeProvider>

  </React.StrictMode>
);
