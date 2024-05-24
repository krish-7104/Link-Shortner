import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BACKEND_LINK } from "../../utils/base-api";
import { MdLinkOff } from "react-icons/md";
import { IoUnlink } from "react-icons/io5";
import { Link } from "react-router-dom";

const LinkPreview = () => {
  const [found, setFound] = useState(true);
  const params = useParams();
  useEffect(() => {
    const GetLinkData = async () => {
      try {
        const resp = await axios.get(
          `${BACKEND_LINK}/link/get-link/${params.id}`
        );
        UpdateAnalytics();
        setFound(true);
      } catch (error) {
        if (error.response.status === 404) {
          setFound(false);
        }
      }
    };

    const UpdateAnalytics = async () => {
      try {
        const resp = await axios.patch(
          `${BACKEND_LINK}/link/update-click/${params.id}`
        );
        window.open(resp.data.data.longurl, "_self");
      } catch (error) {
        console.log(error);
      }
    };
    params.id && GetLinkData();
  }, [params]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      {found && (
        <p className="text-emerald-500 flex justify-center items-center flex-col">
          <AiOutlineLoading3Quarters className="animate-spin mb-3" />{" "}
          Redirecting To Website...
        </p>
      )}
      {!found && (
        <div>
          <div className="flex justify-center items-center flex-col">
            <span className="mb-5 text-[#1d232a] bg-emerald-500 p-3 rounded-full">
              <MdLinkOff size={32} />
            </span>
            <p className="text-emerald-500 font-medium text-xl">
              This Link is Broken!
            </p>
          </div>
        </div>
      )}
      <Link
        to={"/"}
        className="text-xl text-white tracking-wider font-semibold flex justify-center items-center absolute bottom-10"
      >
        <IoUnlink size={30} className="mr-3" />
        Linkify
      </Link>
    </div>
  );
};

export default LinkPreview;
