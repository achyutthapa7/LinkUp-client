import React, { useEffect } from "react";
import { useAuth } from "../context/User";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    !auth.token && navigate("/");
  }, [auth, setAuth]);
  return (
    <div className="flex w-full">
      <div className="w-1/3 bg-red-300">left</div>
      <div className="w-3/4 bg-yellow-300">middle</div>
      <div className="w-1/3 bg-blue-300">right</div>
    </div>
  );
};

export default Feed;
