import React from "react";
import Typed from "react-typed";

function Hero() {
  return (
    <div className="max-w-[1000px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
      <h1 className="text-[#0cc] font-bold text-6xl py-5">
        Better Neptun
      </h1>
      <p className="font-bold text-black text-2xl py-5">
        Tired of Neptun not working properly? Look no further! This is Better Neptun!
        A system which works much better than Neptun!
      </p>

      <div className="text-black font-bold text-2xl py-5">
        With Better Neptun, you can easily manage your students' objects.
      </div>
    </div>
  );
}

export default Hero;
