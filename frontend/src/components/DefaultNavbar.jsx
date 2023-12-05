import React from "react";
import { NavLink } from "react-router-dom";

function DefaultNavbar() {
  return (
    <div className="flex justify-between items-center h-16 mx-auto px-4 bg-blue-900 text-[#00df9a] text-3xl">
      <ul className="flex">
        <li className="p-4">
          <NavLink
            to="/students"
            className="hover:text-[#ff6600] hover:bg-[#5ab9be] hover:py-2 px-4 rounded-full"
          >
            Students
          </NavLink>
        </li>
        <li className="p-4">
          <NavLink
            to="/subjects"
            className="hover:text-[#ff6600] hover:bg-[#5ab9be] hover:py-2 px-4 rounded-full"
          >
            Subjects
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default DefaultNavbar;
