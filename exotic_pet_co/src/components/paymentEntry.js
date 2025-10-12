import {React, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { PaymentContext } from '../context/PaymentContext';
import 'bootstrap/dist/css/bootstrap.min.css';


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
                        <div class="form-group">
                            <label for="text">Card Number</label>
                            <input type='text' class='form-control' value={number} onChange={(e) => setNumber(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="text">Expiration Date</label>
                            <input type='text' class='form-control' value={expDate} onChange={(e) => setExpDate(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="text">CVV</label>
                            <input type='text' class='form-control' value={cvv} onChange={(e) => setCVV(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="text">Card Holder Name</label>
                            <input type="text" class='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div class="form-group">
                            <label for="text">Zip Code</label>
                            <input type='text' class='form-control' value={zip} onChange={(e) => setZip(e.target.value)} />
                        </div>
                        <input type='submit' class="btn-default" />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default PaymentEntry;