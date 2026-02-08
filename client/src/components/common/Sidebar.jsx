import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/auth.slice";
import { SidebarConfig } from "./SideBarConfig";

const Sidebar = ({ role, title }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  // Lazy load links based on role
  const links = SidebarConfig[role] || [];

  return (
    <div className={`bg-slate-900 text-white transition-all duration-300 ${open ? "w-64" : "w-20"} flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {open && <h1 className="text-lg font-bold">{title}</h1>}
        <button onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>

      <nav className="flex-1 p-3 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition ${isActive ? "bg-slate-700" : "hover:bg-slate-800"}`
            }
          >
            {link.icon}
            {open && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-700">
        <button
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800"
          onClick={() => dispatch(logout())}
        >
          <LogOut size={18} />
          {open && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
