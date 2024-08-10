import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Loginform from "./Loginform";
import { useAuth } from "../context/Authentication";
import { useNavigate } from "react-router-dom";
const Home = ({ setRegistrationModal = () => {} }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    if (auth.token) {
      navigate("/feeds");
    }
  }, [auth, setAuth]);
  return (
    <>
      {auth.token ? (
        <Helmet>
          <meta charSet="utf-8" />
          <title>LinkUp</title>
        </Helmet>
      ) : (
        <Helmet>
          <meta charSet="utf-8" />
          <title>LinkUp - log in or sign up</title>
        </Helmet>
      )}

      <div className="flex lg:flex-row flex-col items-center justify-around md:h-screen lg:p-0 pt-12">
        <div className="lg:text-justify flex-1 lg:pl-20 mb-5 text-center">
          <p className="text-6xl font-bold text-blue-700 mb-5">LinkUp</p>
          <p className="text-2xl ">
            Connect with friends and the world <br />
            around you on LinkUp.
          </p>
        </div>
        <Loginform setRegistrationModal={setRegistrationModal} />
      </div>
    </>
  );
};

export default Home;
