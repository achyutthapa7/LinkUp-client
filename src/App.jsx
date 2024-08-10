import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Registrationmodal from "./components/Registrationmodal";
import Friends from "./components/Friends";
import Notifications from "./components/Notifications";
import Userprofile from "./components/Userprofile";
import Notfound from "./components/Notfound";
import Settings from "./components/Settings";

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
        <Route path="/friends" element={<Friends />} />
        <Route path="Notifications" element={<Notifications />} />
        <Route path="/Userprofile" element={<Userprofile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
