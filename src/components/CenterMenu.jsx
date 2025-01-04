import React from "react";
import { Link } from "react-scroll";

function CenterMenu() {
  const liStyle =
    "text-white mr-[3rem] hover:text-[#1DB954] transition-all duration-300 hover:cursor-pointer"; // Tailwind styling for list items

  return (
    <div className="menu flex items-center justify-center w-full py-4 bg-[#081730]">
      <ul className="flex justify-evenly w-3/4 text-lg space-x-12">
        <li className={liStyle}>Home</li>
        <li className={liStyle}>
          <Link to="experience" smooth={true} duration={500}>
            Experience
          </Link>
        </li>
        <li className={liStyle}>
          <Link to="team" smooth={true} duration={500}>
            Team
          </Link>
        </li>
        <li className={liStyle}>What next?  </li>
      </ul>
    </div>
  );
}

export default CenterMenu;
