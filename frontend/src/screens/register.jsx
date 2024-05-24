import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { BACKEND_LINK } from "../../utils/base-api";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user && user.email) navigate("/");
  }, [navigate, user]);

  const RegisterHandler = async (e) => {
    e.preventDefault();
    toast.loading("Processing...");
    try {
      const resp = await axios.post(`${BACKEND_LINK}/auth/register`, data);
      toast.dismiss();
      toast.success(resp.data.message);
      setUser(resp.data.data);
      navigate("/");
    } catch (error) {
      toast.dismiss();
      if (error.response) toast.error(error.response?.data?.message);
      else toast.error("Something Went Wrong!");
      console.log("Register Error\n", error);
    }
  };

  return (
    <section className="h-screen w-full flex justify-center items-center flex-col">
      <form
        className="w-[38%] flex justify-center items-center flex-col bg-[#191e24] rounded-lg p-6 mt-6"
        onSubmit={RegisterHandler}
      >
        <p className="text-2xl font-semibold text-white my-4">Register Now!</p>
        <div className="w-full flex flex-col mb-3">
          <label className="text-white/50 leading-7" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            className="px-3 py-2 bg-transparent border border-white/20 text-white text-sm rounded-lg"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
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
        <button
          className="bg-emerald-500 px-4 py-2 rounded-md font-medium text-[#191e24] mt-2"
          type="submit"
        >
          Register Now!
        </button>
        <Link className="mt-6 text-white/50 text-sm" to={"/login"}>
          Already Have An Account? Login
        </Link>
      </form>
    </section>
  );
};

export default Register;
