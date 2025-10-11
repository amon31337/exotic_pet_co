import {React, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { PaymentContext } from '../context/PaymentContext';


function PaymentEntry() {
    const navigate = useNavigate();
    const { setPaymentData } = useContext(PaymentContext);
    const [number, setNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [name, setName] = useState('');
    const [zip, setZip] = useState('');


    function handleSubmit(e) {
        e.preventDefault();
        //alert(number + ' ' + expDate + ' ' + cvv + ' ' + name + ' ' + zip);
        let newInfo = {
            cardNumber: number,
            expirationDate: expDate,
            cvvCode: cvv,
            cardHolderName: name, 
            zipCode: zip
        }

        setPaymentData(newInfo);
        navigate('/purchase/viewOrder');
    };

    return (
        <div className="min-vh-100" style={{ background: "var(--bg)", color: "var(--text)" }}>
            <div className="container py-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h4 m-0">Enter Card Details</h1>
                    <div className="d-flex gap-2">
                        <Link className="btn btn-outline-secondary" to="/purchase/shippingEntry">Back to Shipping Entry</Link>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Card Number
                                <input type='text' value={number} onChange={(e) => setNumber(e.target.value)} />
                            </label>
                        </div>
                        <div>
                            <label>Expiration Date
                                <input type='text' value={expDate} onChange={(e) => setExpDate(e.target.value)} />
                            </label>
                        </div>
                        <div>
                            <lable>CVV
                                <input type='text' value={cvv} onChange={(e) => setCVV(e.target.value)} />
                            </lable>
                        </div>
                        <div>
                            <label>Card Holder Name
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                        </div>
                        <div>
                            <lable>Zip Code
                                <input type='text' value={zip} onChange={(e) => setZip(e.target.value)} />
                            </lable>
                        </div>
                        <div>
                            <input type='submit' />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default PaymentEntry;