import React, { createContext, useContext, useState } from "react";
const Auth = createContext();
export const Authentication = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
  });
  return <Auth.Provider value={[auth, setAuth]}>{children}</Auth.Provider>;
};

export const useAuth = () => useContext(Auth);
