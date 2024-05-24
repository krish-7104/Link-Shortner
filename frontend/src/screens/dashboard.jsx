import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_LINK } from "../../utils/base-api.js";
import { UserContext } from "../../context/user-context.jsx";
import LinkCard from "../components/LinkCard.jsx";
import NoLink from "../assets/nolinks.svg";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

const Dashboard = () => {
  const [data, setData] = useState();
  const { user } = useContext(UserContext);
  const [flag, setFlag] = useState();
  const navigate = useNavigate();

  const GetAllLinks = async () => {
    try {
      const resp = await axios.get(
        `${BACKEND_LINK}/link/get-links/${user._id}`
      );
      toast.dismiss();
      setData(resp.data.data);
    } catch (error) {
      console.log("Error Getting Links");
      toast.dismiss();
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllLinks();
  }, [user, flag]);

  return (
    <section className="h-screen w-full flex justify-start pt-32 items-center flex-col max-w-6xl overflow-hidden">
      {data && data.length !== 0 && (
        <p className="mb-6 text-2xl font-semibold text-white">Your Links</p>
      )}
      <div className="w-full overflow-y-auto pb-4">
        {data &&
          data.length !== 0 &&
          data.map((item) => {
            return (
              <LinkCard
                key={item._id}
                uniqueId={item.uniqueId}
                longurl={item.longurl}
                clicks={item.clicks}
                setFlag={setFlag}
              />
            );
          })}
      </div>
      {data && data.length !== 0 && (
        <button
          className="p-3 bg-emerald-500 rounded-full fixed bottom-10 right-10 hover:bg-emerald-600"
          onClick={() => navigate("/")}
        >
          <IoAdd size={24} />
        </button>
      )}
      {data && data.length === 0 && (
        <div>
          <img src={NoLink} height={200} width={200} />
          <p className="text-center text-white mb-3">No Links Found!</p>
          <button
            className="bg-emerald-500 px-4 py-2 rounded-md font-medium text-[#191e24] mt-2 block mx-auto hover:bg-emerald-600"
            onClick={() => navigate("/")}
          >
            Short Link Now
          </button>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
