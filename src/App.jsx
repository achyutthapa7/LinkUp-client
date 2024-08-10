import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Registrationmodal from "./components/Registrationmodal";

const App = () => {
  const [registrationModal, setRegistrationModal] = useState(false);

  return (
    <div className="relative">
      <Registrationmodal
        registrationModal={registrationModal}
        setRegistrationModal={setRegistrationModal}
      />
      <Routes>
        <Route
          path="/"
          element={<Home setRegistrationModal={setRegistrationModal} />}
        />
        <Route path="/feeds" element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
