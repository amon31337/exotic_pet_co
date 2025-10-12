import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PaymentContext } from '../context/PaymentContext';
import { computeTotals } from '../helpers/priceHelper.js';

const Confirmation = () => {
    const navigate = useNavigate();
    const { items, total: cartSubtotal, clear } = useCart();
    const { paymentData } = useContext(PaymentContext);
    const [confirmationNumber, setConfirmationNumber] = useState('');

    // Check if payment information is complete
    const isPaymentComplete = paymentData.cardNumber && 
                             paymentData.expirationDate && 
                             paymentData.cvvCode && 
                             paymentData.cardHolderName && 
                             paymentData.zipCode;

    // Redirect if no items in cart or payment not complete
    useEffect(() => {
        if (items.length === 0) {
            navigate('/purchase');
            return;
        }
        if (!isPaymentComplete) {
            navigate('/purchase/viewOrder');
            return;
        }
    }, [items.length, isPaymentComplete, navigate]);

    // Generate a random confirmation number when component mounts
    useEffect(() => {
        if (items.length > 0 && isPaymentComplete) {
            const generateConfirmationNumber = () => {
                const timestamp = Date.now().toString().slice(-6);
                const random = Math.random().toString(36).substring(2, 8).toUpperCase();
                return `EPC-${timestamp}-${random}`;
            };
            setConfirmationNumber(generateConfirmationNumber());
        }
    }, [items.length, isPaymentComplete]);

    // Calculate totals using the same logic as ViewOrder
    const { taxRate, shipping, tax, total } = computeTotals(cartSubtotal);

    // Format card number to show only last 4 digits
    const formatCardNumber = (cardNumber) => {
        if (!cardNumber) return 'N/A';
        return `**** **** **** ${cardNumber.slice(-4)}`;
    };

    return (
        <div className="min-vh-100" style={{ background: "var(--bg)", color: "var(--text)" }}>
            <div className="container py-4">
                {/* Thank You Header */}
                <div className="text-center mb-5">
                    <div className="mb-3">
                        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h1 className="display-4 text-success mb-3">Thank You for Your Order!</h1>
                    <p className="lead text-secondary">
                        Your exotic pets are being prepared for shipment. You'll receive a tracking number via email once your order ships.
                    </p>
                </div>

                {/* Confirmation Number */}
                <div className="card mb-4">
                    <div className="card-body text-center">
                        <h5 className="card-title">Order Confirmation</h5>
                        <div className="fs-4 fw-bold text-primary mb-2">{confirmationNumber}</div>
                        <small className="text-secondary">Please save this number for your records</small>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Order Summary */}
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order Summary</h5>
                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th className="text-end">Price</th>
                                                <th style={{ width: 100 }}>Qty</th>
                                                <th className="text-end">Line Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img 
                                                                src={item.img} 
                                                                alt={item.name}
                                                                className="me-3 rounded"
                                                                style={{ width: 50, height: 50, objectFit: 'cover' }}
                                                            />
                                                            <span>{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-end">${item.price.toFixed(2)}</td>
                                                    <td>{item.qty}</td>
                                                    <td className="text-end">${(item.price * item.qty).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="col-lg-4">
                        {/* Payment Information */}
                        <div className="card mb-3">
                            <div className="card-body">
                                <h6 className="card-title">Payment Information</h6>
                                <div className="small text-secondary">
                                    <div>Card: {formatCardNumber(paymentData.cardNumber)}</div>
                                    <div>Expires: {paymentData.expirationDate || 'N/A'}</div>
                                    <div>Name: {paymentData.cardHolderName || 'N/A'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Order Totals */}
                        <div className="card mb-3">
                            <div className="card-body">
                                <h6 className="card-title">Order Totals</h6>
                                <div className="d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>${cartSubtotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Tax ({(taxRate * 100).toFixed(2)}%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Shipping {shipping === 0 && cartSubtotal > 0 ? "(Free)" : ""}</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">What's Next?</h6>
                                <ul className="small mb-3">
                                    <li>You'll receive an email confirmation shortly</li>
                                    <li>Your order will be processed within 1-2 business days</li>
                                    <li>Shipping information will be sent once your order ships</li>
                                    <li>Expected delivery: 3-5 business days</li>
                                </ul>
                                <div className="d-grid gap-2">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => {
                                            clear();
                                            navigate('/purchase');
                                        }}
                                    >
                                        Continue Shopping
                                    </button>
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={() => window.print()}
                                    >
                                        Print Receipt
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;