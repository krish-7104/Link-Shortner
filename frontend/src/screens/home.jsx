import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { LuLink, LuSendHorizonal } from "react-icons/lu";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import { BACKEND_LINK } from "../../utils/base-api.js";
import { IoClose } from "react-icons/io5";

const Home = () => {
  const [link, setLink] = useState("");
  const [response, setResponse] = useState();
  const { user } = useContext(UserContext);

  const LinkVerify = (link) => {
    return link?.startsWith("https://") || link?.startsWith("http://");
  };

  const ShortLinkGenerator = async () => {
    toast.loading("Shorting the URL..");
    if (LinkVerify(link)) {
      const resp = await axios.post(`${BACKEND_LINK}/link/add-link`, {
        user: user._id,
        url: link,
      });
      setResponse(resp.data.data);
      toast.dismiss();
    } else {
      toast.dismiss();
      toast.error("Enter Valid Link!");
    }
  };

  return (
    <section className="bg-[#1d232a] h-screen w-full flex justify-center items-center flex-col">
      <p className="text-white/60 text-2xl font-medium">
        Short Your <span className="text-emerald-500">Long Urls</span>
      </p>
      <div className="bg-[#191e24] rounded-xl mt-6 w-[45%] flex justify-center items-center">
        <div className="relative w-full flex justify-center items-center">
          <label htmlFor="link" className="sr-only">
            Enter Link
          </label>
          <input
            type="email"
            id="link"
            placeholder="https://loooonglink.com"
            className="w-full rounded-md border-gray-200 bg-transparent text-white outline-none p-4 shadow-sm text-sm tracking-wide caret-emerald-500"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        {response && (
          <button
            className={`text-xl px-3
             text-emerald-500 py-2 rounded-lg font-medium ml-1`}
            onClick={() => {
              setLink("");
              setResponse();
            }}
          >
            <IoClose />
          </button>
        )}
        {!response && (
          <button
            className={`text-xl px-3 ${
              LinkVerify(link) ? "text-emerald-500" : "text-[#2a333e]"
            } py-2 rounded-lg font-medium ml-1`}
            onClick={ShortLinkGenerator}
          >
            <LuSendHorizonal />
          </button>
        )}
      </div>
      {link && response && (
        <div className="bg-[#191e24] w-[45%] rounded-xl p-4 mt-5">
          <p className="text-xs text-emerald-500 mb-1 font-medium">Title</p>
          <p className="text-white text-sm mb-2">{response.title}</p>
          <p className="text-xs text-emerald-500 mb-1 font-medium">Short Url</p>
          <div
            className="relative flex justify-between items-center group cursor-pointer"
            onClick={() =>
              window.open(
                import.meta.env.VITE_FRONTEND_LINK + "/" + response.uniqueId
              )
            }
          >
            <p className="text-white text-sm cursor-pointer group-hover:border-b-emerald-500 group-hover:border-b-2">
              {import.meta.env.VITE_FRONTEND_LINK + "/" + response.uniqueId}
            </p>
            <LuLink className="text-emerald-500" />
          </div>
        </div>
      )}
      <footer className=" absolute bottom-3">
        <p className="text-white/50 tracking-wide text-sm">
          Developed By{" "}
          <a href="https://krishjotaniya.netlify.app">Krish Jotaniya</a>
        </p>
      </footer>
    </section>
  );
};

export default Home;
