import React from "react";
import Typed from "react-typed";

function Hero() {
  return (
    <div className="max-w-[1000px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
      <h1 className="text-[#00df9a] font-bold text-6xl py-5">
        Students and Subjects Portal
      </h1>
      <p className="font-bold text-blue-900 text-2xl py-5">
        Look no further! Our Fruit Supplier Management System is your one-stop
        destination for managing and maintaining your subject and student data
        effortlessly.
      </p>

      <span className="text-[#00df9a] font-bold text-2xl py-5">
        <Typed
          strings={["Create", "Read", "Update", "Delete"]}
          typeSpeed={50}
          backSpeed={25}
        />
      </span>

      <div className="text-blue-900 font-bold text-2xl py-5">
        Here, you have the ability to perform CRUD actions with ease and
        efficiency.
      </div>
    </div>
  );
}

export default Hero;