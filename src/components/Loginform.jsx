import React, { useState } from "react";
import LoadingAnimation from "./LoadingAnimation";
import toast from "react-hot-toast";
import { useAuth } from "../context/User";
import { useNavigate } from "react-router-dom";

const Loginform = ({ setRegistrationModal = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [userName, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if ((userName || emailAddress) && password) {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, emailAddress, password }),
        });
        const data = await res.json();
        if (res.status === 200) {
          navigate("/feeds");
          localStorage.setItem("token", data.token);
          setAuth({ ...auth, token: data.token });
          toast.success("Logged in successfully");
        } else if (res.status === 404) {
          toast.error(data.message);
          setIsLoading(false);
        } else if (res.status === 402) {
          toast.error(data.message);
          setIsLoading(false);
        } else if (res.status === 500) {
          toast.error(data.message);
          setIsLoading(false);
        } else {
          toast.error("An error occurred while logging in");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("An error occurred while logging in");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill all the fields");
      setIsLoading(false);
      return;
    }
  };
  return (
    <div className="flex-1 w-3/4">
      <div className="bg-white p-8 rounded-lg shadow-lg lg:w-3/4 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email or Username"
              name={userName || emailAddress}
              onChange={(e) => {
                const value = e.target.value;
                if (value.includes("@")) {
                  setEmailAddress(value);
                  setUsername("");
                } else {
                  setUsername(value);
                  setEmailAddress("");
                }
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              {isLoading ? <LoadingAnimation /> : "Log In"}
            </button>
          </div>
          <div className="text-center mb-4">
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>
          <hr className="my-4" />
          <div>
            <button
              type="button"
              className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200"
              onClick={() => {
                setRegistrationModal(true);
              }}
            >
              Create new account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
