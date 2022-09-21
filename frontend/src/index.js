import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CurrenciesProvider } from "./contexts/Currencies";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurrenciesProvider>
      <App />
    </CurrenciesProvider>
  </React.StrictMode>
);
