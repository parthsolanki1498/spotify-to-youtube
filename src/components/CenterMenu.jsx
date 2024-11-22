import React from 'react';

function CenterMenu() {
  const liStyle = "text-white mr-[3rem] hover:text-[#1DB954] transition-all duration-300 hover:cursor-pointer"; // Tailwind styling for list items

  return (
    <div className='menu flex items-center justify-center w-full py-4 bg-[#081730]'>
      <ul className='flex space-x-8 md:space-x-12 lg:space-x-16'>
        <li className={liStyle}>Home</li>
        <li className={liStyle}>About</li>
        <li className={liStyle}>Performer</li>
        <li className={liStyle}>Events</li>
      </ul>
    </div>
  );
}

export default CenterMenu;
