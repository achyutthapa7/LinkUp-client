import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Authentication } from "./context/Authentication.jsx";
import { UserProfile } from "./context/UserProfile.jsx";
createRoot(document.getElementById("root")).render(
  <Authentication>
    <UserProfile>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </UserProfile>
  </Authentication>
);
