import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { User } from "./context/User.jsx";
createRoot(document.getElementById("root")).render(
  <User>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </User>
);
