import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

// component to display a summary of the shopping cart
export default function CartSummary() {
  {/* cart context to get items and actions */}
  const { items, total, setQty, remove, clear } = useCart();

  return (
    <div className="card">
      <div className="card-body">
        {/* cart header with title and clear button */}
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title m-0">Shopping Cart</h5>
          <button className="btn btn-outline-secondary btn-sm" onClick={clear}>Clear</button>
        </div>
        {/* cart items list */}
        {items.length === 0 ? (
          <p className="text-secondary mt-3 mb-0">Your cart is empty.</p>
        ) : (
          <>
            {/* cart items list */}
            <div className="d-flex flex-column gap-2 mt-3">
              {items.map(it => (
                <div key={it.id} className="d-flex flex-wrap" style={{ gridTemplateColumns: "1fr 80px 80px 80px", gap: 8, alignItems: "center" }}>
                  {/* cart item row with name, price, quantity input, and remove button */}
                  <div className="flex-grow-1">{it.name}</div>
                  <div className="flex-grow-1">${it.price.toFixed(2)}</div>
                  <input
                    type="number"
                    min={0}
                    className="form-control flex-grow-0"
                    style={{ minWidth: "50px", maxWidth: "70px" }}
                    value={it.qty}
                    onChange={(e) => setQty(it.id, parseInt(e.target.value || "0", 10))}
                  />
                  <button className="btn btn-outline-danger btn-sm" onClick={() => remove(it.id)}>Remove</button>
                </div>
              ))}
            </div>
            <hr className="my-3" />
            {/* total and checkout button */}
            <div className="d-flex justify-content-between align-items-center">
              <strong>Total: ${total.toFixed(2)}</strong>
              <div className="d-flex gap-2">
                <Link to="/purchase/viewOrder" className="btn btn-primary">Checkout</Link>
                {/* <Link to="/purchase/paymentEntry" className="btn btn-primary">Checkout</Link> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
