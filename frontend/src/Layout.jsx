import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../context/user-context";
import axios from "axios";
import { BACKEND_LINK } from "../utils/base-api";
import Cookies from "js-cookie";

const Layout = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const GetUser = async () => {
      const token = Cookies.get("token");
      const resp = await axios.post(
        `${BACKEND_LINK}/auth/get-user`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(resp.data.data);
    };
    GetUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster position="bottom-right" />
    </>
  );
};

export default Layout;
