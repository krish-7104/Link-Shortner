import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_LINK } from "../../utils/base-api";

const LinkCard = ({ uniqueId, longurl, clicks, setFlag }) => {
  const deleteHandler = async () => {
    try {
      toast.loading("Deleting..");
      const resp = await axios.delete(
        `${BACKEND_LINK}/link/delete-link/${uniqueId}`
      );
      toast.dismiss();
      toast.success(resp.data.message);
      setFlag(Math.random());
    } catch (error) {
      toast.dismiss();
      if (error.response) toast.error(error.response?.data?.message);
      else toast.error("Something Went Wrong!");
      console.log("Delete Error\n", error);
    }
  };
  return (
    <div className="w-[90%] mx-auto flex justify-between items-center border p-4 rounded-lg mb-4">
      <div className="flex flex-col">
        <Link
          target="_blank"
          to={import.meta.env.VITE_FRONTEND_LINK + "/" + uniqueId}
          className="text-emerald-500 font-medium cursor-pointer"
        >
          {import.meta.env.VITE_FRONTEND_LINK + "/" + uniqueId}
        </Link>
        <Link
          to={longurl}
          target="_blank"
          className="text-white/50 text-sm mt-1 group cursor-pointer"
        >
          Long Url:{" "}
          <span className="group-hover:border-b group-hover:border-b-white/50">
            {longurl}
          </span>
        </Link>
      </div>
      <div className="flex">
        <div className="flex justify-center flex-col items-end text-white mr-6">
          <p className="text-sm text-white/50">Clicks</p>
          <p className="text-xl">{clicks}</p>
        </div>
        <div className="flex justify-center items-end text-white/80 flex-col">
          <span className="cursor-pointer p-2" onClick={deleteHandler}>
            <MdOutlineDeleteOutline size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
