import React from "react";
import { IoUnlink } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-4 border border-white/20 bg-[#191e24] text-white px-8 py-4 w-[90%] rounded-full mx-auto backdrop-blur-sm flex justify-between items-center">
      <Link
        to={"/"}
        className="text-xl tracking-wider font-semibold flex justify-center items-center"
      >
        <IoUnlink size={30} className="mr-3" />
        Linkify
      </Link>
      <Link
        to={"/register"}
        className="bg-emerald-500 text-[#191924] font-medium px-3 py-2 rounded-lg"
      >
        Register
      </Link>
    </div>
  );
};

export default Navbar;
