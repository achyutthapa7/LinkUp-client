import React, { createContext, useContext, useEffect, useState } from "react";
const User = createContext();
export const UserProfile = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserProfile = async () => {
      const res = await fetch(`${import.meta.env.VITE_URL}/getUserProfile`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setUser(data.user);
        }
      }
    };
    getUserProfile();
  }, [user, setUser]);
  return <User.Provider value={[user, setUser]}>{children}</User.Provider>;
};

export const useUser = () => useContext(User);
