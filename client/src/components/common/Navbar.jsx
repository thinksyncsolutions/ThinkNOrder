import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout, clearBranch } from "../../redux/features/auth/auth.slice";
import { SidebarConfig } from "./SideBarConfig";

const Navbar = ({ role, title }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();

  const links = SidebarConfig[role] || [];

  return (
    <header className="bg-slate-900 text-white shadow">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Left - Title */}
        <h1 className="text-lg font-bold">{title}</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition hover:text-gray-300 ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={() => dispatch(clearBranch())}
            className="hover:text-gray-300"
          >
            Select Branch
          </button>

          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-1 hover:text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-800 px-6 py-4 space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block ${
                  isActive ? "text-yellow-400" : "hover:text-gray-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={() => {
              dispatch(clearBranch());
              setMobileOpen(false);
            }}
            className="block hover:text-gray-300"
          >
            Select Branch
          </button>

          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-2 hover:text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;