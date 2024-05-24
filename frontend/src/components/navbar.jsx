import React, { useContext } from "react";
import { IoUnlink } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/user-context";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return (
    <div className="fixed top-4 border border-white/20 bg-[#191e24] text-white px-8 py-4 w-[90%] rounded-full mx-auto backdrop-blur-sm flex justify-between items-center">
      <Link
        to={"/"}
        className="text-xl tracking-wider font-semibold flex justify-center items-center"
      >
        <IoUnlink size={30} className="mr-3" />
        Linkify
      </Link>
      {user &&
        !user.email &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && (
          <Link
            to={"/login"}
            className="bg-emerald-500 text-[#191924] font-medium px-3 py-2 rounded-lg"
          >
            Login
          </Link>
        )}
      <p className="text-emerald-500 font-medium px-3 py-2 rounded-lg">
        {location.pathname.includes("/login") && "Login"}
        {location.pathname.includes("/register") && "Register"}
        {location.pathname.includes("/forget-password") && "Forget Password"}
        {location.pathname.includes("/verify-token") && "Update Password"}
        {location.pathname.includes("/dashboard") && "Dashboard"}
      </p>
      {user && user.email && location.pathname !== "/dashboard" && (
        <Link
          to={"/dashboard"}
          className="bg-emerald-500 text-[#191924] font-medium px-3 py-2 rounded-lg"
        >
          Dashboard
        </Link>
      )}
    </div>
  );
};

export default Navbar;
