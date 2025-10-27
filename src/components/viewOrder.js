// src/components/viewOrder.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.js";
import { PaymentContext } from "../context/PaymentContext.js";
import { ShippingContext } from "../context/ShippingContext.js";
import { computeTotals } from "../helpers/priceHelper.js";

const API_URL = "https://etw6zgg8c6.execute-api.us-east-2.amazonaws.com/dev/order-processing/order";



const ViewOrder = () => {
  const navigate = useNavigate();
  const { items, total: cartSubtotal } = useCart();
  const { paymentData } = useContext(PaymentContext);
  const { shippingData } = useContext(ShippingContext);

  const handlePlaceOrder = async () => {
    try {
      // construct order information
      const orderInfo = {
        productList: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.qty,
        })
        ),
        paymentInfo: paymentData,
        shippingInfo: shippingData,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order placed successfully:", result);
      navigate("/purchase/confirmation", { state: { confirmationCode: result.confirmationCode } });
    }
    catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again later.");
    }
  };

  // Initialize legal agreement state from localStorage
  const [legalAgreementChecked, setLegalAgreementChecked] = useState(() => {
    try {
      const saved = localStorage.getItem('legalAgreementChecked');
      return saved === 'true';
    } catch (error) {
      console.error("Error loading legal agreement state:", error);
      return false;
    }
  });

  // Save legal agreement state to localStorage whenever it changes
  React.useEffect(() => {
    try {
      localStorage.setItem('legalAgreementChecked', legalAgreementChecked.toString());
    } catch (error) {
      console.error("Error saving legal agreement state:", error);
    }
  }, [legalAgreementChecked]);

  // derive totals
  const { taxRate, shipping, tax, total } = computeTotals(cartSubtotal);

  const isEmpty = items.length === 0;

  // Check if payment information is complete
  const isPaymentComplete = paymentData.cardNumber &&
    paymentData.expirationDate &&
    paymentData.cvvCode &&
    paymentData.cardHolderName &&
    paymentData.zipCode;

  // Check if shipping information is complete
  const isShippingComplete = shippingData.firstName &&
    shippingData.lastName &&
    shippingData.addressLine1 &&
    shippingData.city &&
    shippingData.state &&
    shippingData.zip;

  return (
    <div className="min-vh-100" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h4 m-0">Order Review</h1>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-secondary" to="/purchase">Back to Purchase</Link>
          </div>
        </div>

        {/* Cart items */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Items</h5>
            {isEmpty ? (
              <p className="text-secondary mb-0">Your cart is empty. <Link to="/purchase">Add items</Link> to continue.</p>
            ) : (
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
                    {items.map(it => (
                      <tr key={it.id}>
                        <td>{it.name}</td>
                        <td className="text-end">${it.price.toFixed(2)}</td>
                        <td>{it.qty}</td>
                        <td className="text-end">${(it.price * it.qty).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Legal Agreement */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Legal Agreement</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="legalAgreement"
                checked={legalAgreementChecked}
                onChange={(e) => setLegalAgreementChecked(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="legalAgreement">
                I have read and agree to the <Link to="/legal" target="_blank" className="text-primary">Customer Agreement</Link> and understand that:
              </label>
            </div>
            <ul className="mt-2 mb-0 text-secondary small">
              <li>I will provide proper care and humane treatment for any purchased animal</li>
              <li>I will maintain appropriate habitat conditions for the animal's species</li>
              <li>I will allow Exotic Pet Co. to conduct welfare inspections</li>
              <li>I understand that Exotic Pet Co. may reclaim the animal if proper care is not provided</li>
              <li>I am responsible for compliance with all applicable laws and regulations</li>
            </ul>
            {!legalAgreementChecked && (
              <div className="alert alert-warning mt-3 mb-0">
                <strong>Required:</strong> You must agree to the legal terms before proceeding with your order.
              </div>
            )}
          </div>
        </div>

        {/* Totals */}
        <div className="row g-3">
          <div className="col-lg-7">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Next Steps</h5>
                <ol className="mb-3 text-secondary">
                  <li>Agree to the legal terms above</li>
                  <li>Enter <Link to="/purchase/paymentEntry">Payment</Link> details</li>
                  <li>Enter <Link to="/purchase/shippingEntry">Shipping</Link> address</li>
                  <li>Return here and <Link to="/purchase/confirmation">Confirm</Link> your order</li>
                </ol>
                <div className="d-flex flex-wrap gap-2">
                  <Link to="/purchase/paymentEntry" className="btn btn-primary">Go to Payment</Link>
                  <Link to="/purchase/shippingEntry" className="btn btn-outline-primary">Go to Shipping</Link>
                  <button
                    className="btn btn-success"
                    disabled={isEmpty || !isPaymentComplete || !isShippingComplete || !legalAgreementChecked}
                    onClick={() => handlePlaceOrder()}
                  >
                    Proceed to Confirmation
                  </button>
                </div>
                {isEmpty && <p className="text-danger mt-2 mb-0">Add at least one item before confirming.</p>}
                {!isEmpty && !legalAgreementChecked && <p className="text-warning mt-2 mb-0">Please agree to the legal terms before confirming your order.</p>}
                {!isEmpty && legalAgreementChecked && !isPaymentComplete && <p className="text-warning mt-2 mb-0">Please enter your payment information before confirming your order.</p>}
                {!isEmpty && legalAgreementChecked && isPaymentComplete && !isShippingComplete && <p className="text-warning mt-2 mb-0">Please enter your shipping address before confirming your order.</p>}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Totals</h5>
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Estimated Tax ({(taxRate * 100).toFixed(2)}%)</span>
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
                <div className="text-secondary mt-2" style={{ fontSize: 12 }}>
                  * Tax and shipping shown here are estimates for demo purposes.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewOrder;
