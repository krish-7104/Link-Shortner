import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_LINK } from "../../utils/base-api";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const [data, setData] = useState({ password: "", cpassword: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const UpdatePassword = async (e) => {
    e.preventDefault();
    toast.loading("Processing...");
    if (data.password === data.cpassword) {
      try {
        const resp = await axios.post(`${BACKEND_LINK}/auth/verify-token`, {
          ...data,
          token: location.search.replace("?token=", ""),
        });
        toast.dismiss();
        toast.success(resp.data.message);
        navigate("/login");
      } catch (error) {
        toast.dismiss();
        if (error.response) toast.error(error.response?.data?.message);
        else toast.error("Something Went Wrong!");
        console.log("Update Password Error\n", error);
      }
    } else {
      toast.dismiss();
      toast.error("Password are different!");
    }
  };

  return (
    <section className="h-screen w-full flex justify-center items-center flex-col">
      <form
        className="w-[38%] flex justify-center items-center flex-col bg-[#191e24] rounded-lg p-6 mt-6"
        onSubmit={UpdatePassword}
      >
        <p className="text-2xl font-semibold text-white my-4">
          Update Password!
        </p>
        <div className="w-full flex flex-col mb-3">
          <label className="text-white/50 leading-7" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            className="px-3 py-2 bg-transparent border border-white/20 text-white text-sm rounded-lg"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="w-full flex flex-col mb-3">
          <label className="text-white/50 leading-7" htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            value={data.cpassword}
            className="px-3 py-2 bg-transparent border border-white/20 text-white text-sm rounded-lg"
            onChange={(e) => setData({ ...data, cpassword: e.target.value })}
          />
        </div>
        <button
          className="bg-emerald-500 px-4 py-2 rounded-md font-medium text-[#191e24] mt-2"
          type="submit"
        >
          Update Password
        </button>
      </form>
    </section>
  );
};

export default UpdatePassword;
