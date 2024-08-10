import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/Authentication";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../context/UserProfile";
import { Tooltip } from "react-tooltip";
import {
  faHome,
  faBell,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import "react-tooltip/dist/react-tooltip.css";
import toast from "react-hot-toast";

const Feed = ({ value }) => {
  const [user] = useUser();
  const feed = useRef();
  const friend = useRef();
  const notification = useRef();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    !auth.token && navigate("/");
  }, [auth, navigate]);

  const location = useLocation();

  useEffect(() => {
    let currentPath = location.pathname;
    if (currentPath === "/feeds") {
      feed.current.classList.add("active");
    }
    if (currentPath === "/friends") {
      friend.current.classList.add("active");
    }
    if (currentPath === "/notifications") {
      notification.current.classList.add("active");
    }
  }, [location.pathname]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        if (data) toast(data.message);
        localStorage.removeItem("token");
        setAuth({ ...auth, token: "" });
        navigate("/");
      } else if (res.status === 404) {
        if (data) toast.error(data.message);
      } else if (res.status === 500) {
        if (data) toast.error(data.message);
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex w-full h-screen relative">
      <div className="w-1/3 border-r-2 border-black/10 sticky top-0 left-0 p-4">
        <a href={"/feeds"}>
          <p className="text-2xl font-bold text-blue-700 mb-5">LinkUp</p>
        </a>
      </div>

      <div className="w-3/4 border-r-0 border-black/10 overflow-scroll scrollbar overflow-x-hidden">
        <div className="flex gap-10 justify-around py-7 shadow-md bg-blue-500 mb-10 sticky top-0">
          <a href={"/feeds"}>
            <FontAwesomeIcon
              icon={faHome}
              className="text-slate-100 text-lg cursor-pointer"
              ref={feed}
              data-tooltip-id="home-tooltip"
              data-tooltip-content="Home"
            />
            <Tooltip id="home-tooltip" />
          </a>
          <a href={"/friends"}>
            <FontAwesomeIcon
              icon={faUserFriends}
              className="text-slate-100 text-lg cursor-pointer"
              ref={friend}
              data-tooltip-id="friends-tooltip"
              data-tooltip-content="Friends"
            />
            <Tooltip id="friends-tooltip" />
          </a>
          <a href={"/notifications"}>
            <FontAwesomeIcon
              icon={faBell}
              className="text-slate-100 text-lg cursor-pointer"
              ref={notification}
              data-tooltip-id="notifications-tooltip"
              data-tooltip-content="Notifications"
            />
            <Tooltip id="notifications-tooltip" />
          </a>
        </div>

        <div className="px-10">{value}</div>
      </div>

      <div
        className="w-1/3 border-l-2 border-black/10 sticky top-0 right-0 p-4 flex justify-end "
        ref={profileRef}
      >
        <div
          className="w-[48px] h-[48px] rounded-full cursor-pointer"
          onClick={() => setDropdownVisible(!dropdownVisible)}
          data-tooltip-id="profile-tooltip"
          data-tooltip-content="Profile"
        >
          {user && (
            <img
              src={user.profilePicture}
              alt="pp"
              className="w-full h-full object-cover rounded-full"
            />
          )}
          <Tooltip id="profile-tooltip" />
        </div>

        {dropdownVisible && (
          <div className="absolute top-16 right-0 w-48 bg-white border border-gray-300 rounded shadow-lg">
            <ul className="py-1">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-xl"
                onClick={() =>
                  navigate("/Userprofile", { state: user && user })
                }
              >
                Go to Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-xl"
                onClick={() => navigate("/settings")}
              >
                Settings
              </li>
              <li
                className="px-4 py-2 hover:bg-red-600 hover:text-white rounded-xl cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
