import React, { useContext } from "react";
import { IoUnlink } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import { BACKEND_LINK } from "../../utils/base-api";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const LogoutHandler = async () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged Out Successfully!");
  };

  return (
    <div className="fixed top-4 border border-white/20 bg-[#191e24] text-white px-8 py-4 w-[90%] rounded-full mx-auto backdrop-blur-sm flex justify-between items-center">
      <Link
        to="/"
        className="text-xl tracking-wider font-semibold flex justify-center items-center"
      >
        <IoUnlink size={30} className="mr-3" />
        Linkify
      </Link>
      {!user?.email &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && (
          <Link
            to="/login"
            className="bg-emerald-500 text-[#191924] font-medium px-3 py-2 rounded-lg"
          >
            Login
          </Link>
        )}
      {user && user.email && location.pathname !== "/dashboard" && (
        <Link
          to="/dashboard"
          className="bg-emerald-500 text-[#191924] font-medium px-3 py-2 rounded-lg"
        >
          Dashboard
        </Link>
      )}
      {user && location.pathname === "/dashboard" && (
        <div
          onClick={LogoutHandler}
          className="bg-[#1d232a] hover:bg-[#232a33] cursor-pointer px-3 py-2 rounded-lg"
        >
          Logout
        </div>
      )}
    </div>
  );
};

export default Navbar;
