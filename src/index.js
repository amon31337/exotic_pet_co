import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from './components/MainLayout';
import Home from './components/home';
import About from './components/about';
import Legal from './components/legal';
import ContactUs from './components/contactUs';
import Purchase from './components/purchase';
import Confirmation from './components/confirmation';
import PaymentEntry from './components/paymentEntry';
import ShippingEntry from './components/shippingEntry';
import ViewOrder from './components/viewOrder';
import ContactUs from './components/contactUs';
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
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<MainLayout />}>
                  <Route path="purchase" element={<Purchase />} />
                  <Route path="purchase/viewOrder" element={<ViewOrder />} />
                  <Route path="purchase/paymentEntry" element={<PaymentEntry />} />
                  <Route path="purchase/shippingEntry" element={<ShippingEntry />} />
                  <Route path="purchase/confirmation" element={<Confirmation />} />
                  <Route path="about" element={<About />} />
                  <Route path="legal" element={<Legal />} />
                  <Route path="contactUs" element={<ContactUs />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ShippingProvider>
        </PaymentProvider>
      </CartProvider>
    </ThemeProvider>

  </React.StrictMode>
);
