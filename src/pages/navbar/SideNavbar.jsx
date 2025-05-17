import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoSettings, IoHome } from "react-icons/io5";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { FaBowlFood, FaBlog, FaTimeline } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { GoOrganization } from "react-icons/go";

import { MANAGEMENTS } from "../../utils/constants/Constants";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(null);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle Section Toggle
  const handleSectionToggle = (section) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "flex items-center p-3 bg-green-700 text-white rounded"
      : "flex items-center p-3 hover:bg-gray-700 cursor-pointer";

  const handleNavLinkClick = () => {
    // Close any open sections when clicking a NavLink
    setActiveSection(null);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } h-screen bg-gray-800 text-white transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>
            Logo
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            {isOpen ? "<" : ">"}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="mt-4">
          {/* Static Links */}
          <li>
            <NavLink
              to="/dashboard"
              className={navLinkStyles}
              onClick={handleNavLinkClick}
            >
              <span className="text-2xl">
                <IoHome className="text-green-400" />
              </span>
              <span
                className={`ml-3 text-lg ${
                  isOpen ? "block" : "hidden"
                } transition-all duration-300`}
              >
                Dashboard
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={navLinkStyles}
              onClick={handleNavLinkClick}
            >
              <span className="text-2xl">
                <GiFarmer className="text-green-400" />
              </span>
              <span
                className={`ml-3 text-lg ${
                  isOpen ? "block" : "hidden"
                } transition-all duration-300`}
              >
                Test example
              </span>
            </NavLink>
          </li>

          {/* Collapsible Section with Subsections */}
          <li>
            <div
              className={`${navLinkStyles({
                isActive: activeSection === "management"
              })}`}
              onClick={() => handleSectionToggle("management")}
            >
              <span className="text-2xl">
                <HiOutlineAdjustmentsVertical className="text-green-400" />
              </span>
              <span
                className={`ml-3 text-lg ${
                  isOpen ? "block" : "hidden"
                } transition-all duration-300`}
              >
                Management
              </span>
              <span
                className={`ml-auto text-lg ${
                  isOpen ? "block" : "hidden"
                } transition-all duration-300`}
              >
                {activeSection === "management" ? "▲" : "▼"}
              </span>
            </div>
            {/* Managements list. */}
            {isOpen && activeSection === "management" && (
              <ul className="pl-10 mt-2">
                {MANAGEMENTS?.map((management) => {
                  return (
                    <li key={management}>
                      <NavLink
                        to={`/${management.slug}`}
                        className={navLinkStyles}
                      >
                        <span className="text-2xl">
                          <management.icon className="text-green-400" />
                        </span>
                        <span className="ml-3">{management.name}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/logout" className={navLinkStyles}>
              <span className="text-2xl">
                <FaPowerOff className="text-green-400" />
              </span>
              <span
                className={`ml-3 text-lg ${
                  isOpen ? "block" : "hidden"
                } transition-all duration-300`}
              >
                Log Out
              </span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default SideNavbar;
