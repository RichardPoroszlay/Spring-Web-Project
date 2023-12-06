import React from "react";
import { NavLink } from "react-router-dom";

function DefaultNavbar() {
  return (
    <div className="flex justify-around items-center h-16 mx-auto px-4 bg-[#001034] text-[white] text-2xl font-bold">
      <ul className="flex">
        <li className="p-4">
          <NavLink
            to="/get-students"
            className="hover:text-[#00ffb9] hover:py-2 px-4"
          >
            Students
          </NavLink>
        </li>
        <li className="p-4">
           <NavLink
            to=""
            className="hover:text-[#00ffb9] hover:py-2 px-4"
          >
            Home
           </NavLink>
        </li>
        <li className="p-4">
          <NavLink
            to="/get-subjects"
            className="hover:text-[#00ffb9] hover:py-2 px-4"
          >
            Subjects
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default DefaultNavbar;
