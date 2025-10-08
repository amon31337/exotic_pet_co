import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Purchase from './components/purchase';
import Confirmation from './components/confirmation';
import PaymentEntry from './components/paymentEntry';
import ShippingEntry from './components/shippingEntry';
import ViewOrder from './components/viewOrder';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/" element={<Navigate replace to="/purchase" />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/paymentEntry" element={<PaymentEntry />} />
        <Route path="/shippingEntry" element={<ShippingEntry />} />
        <Route path="/viewOrder" element={<ViewOrder />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
