import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/user-context";

const Layout = () => {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
      <Toaster position="bottom-right" />
    </UserProvider>
  );
};

export default Layout;
