import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuSendHorizonal } from "react-icons/lu";

const Home = () => {
  const [link, setLink] = useState("");

  const LinkVerify = (link) => {
    return link.startsWith("https://") || link.startsWith("http://");
  };

  const ShortLinkGenerator = () => {
    if (LinkVerify(link)) {
      //
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
      <div className="bg-[#191e24] p-3 rounded-xl mt-6 w-[45%] flex justify-center items-center">
        <div className="relative w-full flex justify-center items-center">
          <label htmlFor="link" className="sr-only">
            Enter Link
          </label>
          <input
            type="email"
            id="link"
            placeholder="https://loooonglink.com"
            className="w-full rounded-md border-gray-200 bg-transparent text-white outline-none px-2 shadow-sm text-sm tracking-wide caret-emerald-500"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <button
          className={`text-xl px-3 ${
            LinkVerify(link) ? "text-emerald-500" : "text-[#2a333e]"
          } py-2 rounded-lg font-medium ml-1`}
          onClick={ShortLinkGenerator}
        >
          <LuSendHorizonal />
        </button>
      </div>
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
