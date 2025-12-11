// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.css";

// Handle GitHub Pages routing redirect
if (window.location.pathname.includes("/?/")) {
  const redirectPath = window.location.pathname.replace("/?/", "/").replace(/~and~/g, "&");
  window.history.replaceState(null, null, redirectPath + window.location.search + window.location.hash);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
