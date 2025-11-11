import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext.js";
import ListHeader from "./ui/ListHeader.js";
import ItemList from "./ui/ItemList.js";
import CartSummary from "./ui/CartSummary.js";
// import { catalog as baseCatalog } from "../fake_data/fake_data.js";

// temporary API address. place in a config in production
const API_URL = "https://kn3p63vwv2.execute-api.us-east-2.amazonaws.com/dev/inventory-management";
const ITEMS_BASE = `${API_URL}/items`;

const Purchase = () => {
  const { add } = useCart();

  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("name-asc");
  const [items, setItems] = useState([]); // store fetched items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearch = async (query) => {
    setError(null);
    setLoading(true);

    try {
      let result = []
      console.log("Searching URL:", query ? `${ITEMS_BASE}/${encodeURIComponent(query)}` : ITEMS_BASE);
      // default
      if (!query){
        const response = await fetch(ITEMS_BASE);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        result = await response.json();
        console.log("Fetched from URL:", query ? `${ITEMS_BASE}/${encodeURIComponent(query)}` : ITEMS_BASE);
      } else {
        let response = await fetch(`${ITEMS_BASE}/${encodeURIComponent(query)}`);
        if (response.ok) {
          const item = await response.json();
          result = [item];
        } else if (response.status === 404) {
          // no items found, fall back to search by name
          response = await fetch(`${ITEMS_BASE}?name=${encodeURIComponent(query)}`);
          if (response.ok) {
            result = await response.json();
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      // set displayed items
      setItems(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    async function loadInventory() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(JSON.parse(data['body']));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  const catalog = useMemo(() => {
    const list = [...items];
    switch (sort) {
      case "name-asc": list.sort((a,b) => a.name.localeCompare(b.name)); break;
      case "name-desc": list.sort((a,b) => b.name.localeCompare(a.name)); break;
      case "price-asc": list.sort((a,b) => a.price - b.price); break;
      case "price-desc": list.sort((a,b) => b.price - a.price); break;
      default: break;
    }
    return list;
  }, [items, sort]);

  if (loading) return <div className="container py-5 text-center">Loading inventory...</div>;
  if (error) return <div className="container py-5 text-danger text-center">{error}</div>;

  return (
    <div className="min-vh-100" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          {/* <button className="btn btn-outline-secondary" onClick={toggle}>Theme: {mode}</button> */}
        </div>

        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <ListHeader
                  count={catalog.length}
                  view={view}
                  setView={setView}
                  sort={sort}
                  setSort={setSort}
                  search={search}
                  setSearch={setSearch}
                  onSearch={handleSearch}
                  // onToggleTheme={toggle}
                />
                <ItemList
                  items={catalog}
                  layout={view}
                  onAdd={(item, qty) => add(item, qty)}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <CartSummary />
            {/* <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Quick Links</h5>
                <ul className="text-secondary mb-0">
                  <li>Fill payment on /purchase/paymentEntry</li>
                  <li>Enter shipping on /purchase/shippingEntry</li>
                  <li>Review summary on /purchase/viewOrder</li>
                  <li>Confirm on /purchase/confirmation</li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Purchase;
