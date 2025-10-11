import React from "react";

export default function ListHeader({ count, view, setView, sort, setSort, onToggleTheme }) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <span className="badge text-bg-light border">{`Items: ${count}`}</span>
      <div className="d-flex gap-2">
        <select className="form-select" style={{ width: 160 }} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name-asc">Name Z-A</option>
          <option value="name-desc">Name A-Z</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
        </select>
        <select className="form-select" style={{ width: 120 }} value={view} onChange={(e) => setView(e.target.value)}>
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
        <button className="btn btn-outline-secondary" onClick={onToggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
}

