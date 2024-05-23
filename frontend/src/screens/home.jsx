import React from "react";
import { IoUnlink } from "react-icons/io5";

const Home = () => {
  return (
    <section className="bg-[#1d232a] h-screen w-full flex justify-center items-center flex-col">
      <h1 className="text-3xl text-white font-semibold">
        Linkify - Link Shortner
      </h1>
      <p className="mt-3 text-white/60">Short you long urls</p>
    </section>
  );
};

export default Home;
