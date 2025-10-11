import React from "react";
import ItemCard from "./ItemCard";

export default function ItemList({ items, layout = "grid", onAdd }) {
  if (layout === "list") {
    return (
      <div className="d-flex flex-column gap-2">
        {items.map((it) => (
          <ItemCard key={it.id} item={it} layout="list" onAdd={onAdd} />
        ))}
      </div>
    );
  }

  // Grid layout using Bootstrap responsive rows
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
      {items.map((it) => (
        <div key={it.id} className="col">
          <ItemCard item={it} layout="grid" onAdd={onAdd} />
        </div>
      ))}
    </div>
  );
}
