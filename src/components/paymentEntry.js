import {React, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { PaymentContext } from '../context/PaymentContext';
import 'bootstrap/dist/css/bootstrap.min.css';


function PaymentEntry() {
    const navigate = useNavigate();
    const { paymentData, setPaymentData } = useContext(PaymentContext);
    const [number, setNumber] = useState(paymentData['cardNumber']);
    const [expDate, setExpDate] = useState(paymentData['expirationDate']);
    const [cvv, setCVV] = useState(paymentData['cvvCode']);
    const [name, setName] = useState(paymentData['cardHolderName']);
    const [zip, setZip] = useState(paymentData['zipCode']);


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
                        <div className="form-group">
                            <label for="text">Card Number</label>
                            <input type='text' className='form-control' value={number} onChange={(e) => setNumber(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label for="text">Expiration Date</label>
                            <input type='text' className='form-control' value={expDate} onChange={(e) => setExpDate(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label for="text">CVV</label>
                            <input type='text' className='form-control' value={cvv} onChange={(e) => setCVV(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label for="text">Card Holder Name</label>
                            <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label for="text">Zip Code</label>
                            <input type='text' className='form-control' value={zip} onChange={(e) => setZip(e.target.value)} />
                        </div>
                        <input type='submit' className="btn btn-primary" />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default PaymentEntry;