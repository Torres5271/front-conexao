import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/reset.css";
import "./utils/global.css";
import "./utils/datePicker.css";
import "./utils/calendar.css";
import "./utils/global.js";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
