import React from "react";
import { useLocation } from "react-router-dom";

const Userprofile = () => {
  const location = useLocation();
  const user = location.state;
  return <div>{user.userName}</div>;
};

export default Userprofile;
