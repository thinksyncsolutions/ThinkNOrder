import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Store,
  Users,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/auth.slice";

const OwnerLayout = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-slate-900 text-white transition-all duration-300 ${
          open ? "w-64" : "w-20"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {open && <h1 className="text-lg font-bold">Owner Panel</h1>}
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <SidebarLink to="/owner" icon={<LayoutDashboard size={18} />} label="Dashboard" open={open} />
          <SidebarLink to="/owner/branches" icon={<Store size={18} />} label="Branches" open={open} />
          <SidebarLink to="/owner/staff" icon={<Users size={18} />} label="Staff" open={open} />
          <SidebarLink to="/owner/menu" icon={<ClipboardList size={18} />} label="Menu" open={open} />
          <SidebarLink to="/owner/settings" icon={<Settings size={18} />} label="Settings" open={open} />
        </nav>

        <div className="p-3 border-t border-slate-700">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800">
            <LogOut size={18} />
            <span onClick={() => dispatch(logout())} className="cursor-pointer">
              {open && "Logout"}
            </span>
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-700">Restaurant Owner</h2>
          <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold">
            O
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, open }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-2 rounded-lg transition ${
        isActive ? "bg-slate-700" : "hover:bg-slate-800"
      }`
    }
  >
    {icon}
    {open && <span>{label}</span>}
  </NavLink>
);

export default OwnerLayout;
