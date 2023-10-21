import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalStyle from "./shared/GlobalStyle.js";
import AppProvider from "~/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStyle />
      <App />
    </AppProvider>
  </React.StrictMode>
);
