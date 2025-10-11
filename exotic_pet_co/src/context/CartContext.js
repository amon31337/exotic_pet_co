import React, { createContext, useContext, useReducer, useMemo } from "react";

const CartContext = createContext();

// items: { [id]: { id, name, price, img, qty } }
// const initialState = { items: {} };
const persisted = (() => {
   try { return JSON.parse(localStorage.getItem("cart_state")) || { items: {} }; }
   catch { return { items: {} }; }
})();
const initialState = persisted;

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { item, qty } = action.payload;
      const prev = state.items[item.id] || { ...item, qty: 0 };
      const nextQty = Math.max(0, prev.qty + qty);
      const nextItems = { ...state.items };
      if (nextQty === 0) delete nextItems[item.id];
      else nextItems[item.id] = { ...prev, qty: nextQty };
      return { ...state, items: nextItems };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const nextItems = { ...state.items };
      if (!nextItems[id]) return state;
      if (qty <= 0) delete nextItems[id];
      else nextItems[id] = { ...nextItems[id], qty };
      return { ...state, items: nextItems };
    }
    case "REMOVE": {
      const { id } = action.payload;
      const nextItems = { ...state.items };
      delete nextItems[id];
      return { ...state, items: nextItems };
    }
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // const [state, dispatch] = useReducer(cartReducer, initialState);
   const [state, dispatch] = useReducer(cartReducer, initialState);
   React.useEffect(() => {
     localStorage.setItem("cart_state", JSON.stringify(state));
   }, [state]);
  const api = useMemo(() => ({
    items: Object.values(state.items),
    total: Object.values(state.items).reduce((sum, it) => sum + it.price * it.qty, 0),
    add: (item, qty = 1) => dispatch({ type: "ADD", payload: { item, qty } }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
    remove: (id) => dispatch({ type: "REMOVE", payload: { id } }),
    clear: () => dispatch({ type: "CLEAR" })
  }), [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() { return useContext(CartContext); }
