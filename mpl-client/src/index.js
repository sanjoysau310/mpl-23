import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreContext } from "./context/StoreContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const RootApp = () => {
  const [store, setStore] = useState(null);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      <App />
    </StoreContext.Provider>
  );
};

root.render(
  // <React.StrictMode>
  <RootApp />
  // </React.StrictMode>
);
reportWebVitals();
