// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.css";

// Handle GitHub Pages SPA redirect
(function() {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
