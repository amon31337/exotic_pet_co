import React, { useState } from "react";

export default function ItemCard({ item, onAdd, layout = "grid" }) {
  const [qty, setQty] = useState(1);

  return (
    <div className={`card h-100 ${layout === "list" ? "flex-row" : ""}`}>
      {/* card item's image */}
      <img
        src={item.img}
        alt={item.name}
        className={layout === "list" ? "img-fluid rounded-start" : "card-img-top"}
        style={layout === "list" ? { width: 180, height: 120, objectFit: "cover" } : { height: 160, objectFit: "cover" }}
      />
      {/* card item's details */}
      <div className="card-body d-flex flex-column gap-2">
        <h6 className="card-title mb-1">{item.name}</h6>
        <div className="text-secondary">${item.price.toFixed(2)}</div>
        <div className="d-flex gap-2 mt-auto">
          <input
            type="number"
            min={1}
            className="form-control"
            style={{ maxWidth: 90 }}
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value || "1", 10))}
          />
          {/* add to cart button */}
          <button className="btn btn-primary" onClick={() => onAdd(item, qty)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
