import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-6 flex justify-between items-center relative">
      <h1 className="text-blue-600 text-4xl font-extrabold">Apollo 24|7</h1>

      
      <nav className="space-x-8 hidden md:flex text-lg font-semibold">
        <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">Doctors</a>
        <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">Pharmacy</a>
        <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">Lab Tests</a>
        <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">Covid Care</a>
      </nav>

      
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 space-y-4 md:hidden z-10 font-semibold text-lg">
          <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">Doctors</a>
          <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">Pharmacy</a>
          <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">Lab Tests</a>
          <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">Covid Care</a>
        </div>
      )}
    </header>
  );
};

export default Header;
