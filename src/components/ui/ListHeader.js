import React from "react";

export default function 
ListHeader({ count, view, setView, sort, setSort, search, setSearch, onSearch, onToggleTheme }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // search trimmed
    onSearch?.(search.trim());
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      {/* header with item count, view and sort selectors, and theme toggle button */}
      <span className="badge text-bg-light border">{`Items: ${count}`}</span>
      <div className="d-flex gap-2">
        {/* search field */}
        <form className="d-flex gap-2" onSubmit={handleSubmit}>
          <input type="text" className="form-control" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-outline-secondary">Search</button>
        </form>
        {/* sort selector */}
        <select className="form-select" style={{ width: 160 }} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
        </select>
        {/* view selector */}
        <select className="form-select" style={{ width: 120 }} value={view} onChange={(e) => setView(e.target.value)}>
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
        {/* <button className="btn btn-outline-secondary" onClick={onToggleTheme}>Toggle Theme</button> */}
      </div>
    </div>
  );
}

