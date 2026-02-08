import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  ClipboardList,
  Users,
  UtensilsCrossed,
  BarChart3,
  LogOut,
} from "lucide-react";

const ManagerLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-slate-900 text-white transition-all duration-300 ${
          open ? "w-64" : "w-20"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {open && <h1 className="text-lg font-bold">Branch Manager</h1>}
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <SidebarLink to="/manager" icon={<LayoutDashboard size={18} />} label="Dashboard" open={open} />
          <SidebarLink to="/manager/orders" icon={<ClipboardList size={18} />} label="Orders" open={open} />
          <SidebarLink to="/manager/tables" icon={<UtensilsCrossed size={18} />} label="Tables" open={open} />
          <SidebarLink to="/manager/staff" icon={<Users size={18} />} label="Staff" open={open} />
          <SidebarLink to="/manager/reports" icon={<BarChart3 size={18} />} label="Reports" open={open} />
        </nav>

        <div className="p-3 border-t border-slate-700">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800">
            <LogOut size={18} />
            {open && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-700">Branch Operations</h2>
          <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold">
            M
          </div>
        </header>

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

export default ManagerLayout;
