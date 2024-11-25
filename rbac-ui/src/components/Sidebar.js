import React, { useState, useEffect } from "react"; 
import { NavLink } from "react-router-dom"; 
import { FaUsers, FaShieldAlt, FaKey, FaBars } from "react-icons/fa";
import { useTheme } from '../ThemeContext'; 

const Sidebar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  useEffect(() => {
    localStorage.setItem("sidebarOpen", isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div>
      {/* Toggle button for small screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Sidebar */}
      <nav className={`bg-${isDarkMode ? 'gray-800' : 'white'} h-full text-${isDarkMode ? 'white' : 'black'} p-4`}>
        {/* Sidebar content */}
        <ul className={`space-y-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? "transform-none" : "transform -translate-x-full"} md:block`}>
          <li>
          <button 
          onClick={toggleTheme} 
          className="w-full text-left p-2 bg-gray-500 rounded mb-4">
          Change Mode
        </button>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "hover:text-blue-400"
              }
            >
              <FaUsers className="mr-2 inline" /> Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/roles"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "hover:text-blue-400"
              }
            >
              <FaShieldAlt className="mr-2 inline" /> Roles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/permissions"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "hover:text-blue-400"
              }
            >
              <FaKey className="mr-2 inline" /> Permissions
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
