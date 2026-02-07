import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ShieldCheck, CalendarCheck, ClipboardList, LogOut } from "lucide-react";

const GuardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-56 bg-slate-900 text-white flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-slate-800 flex items-center gap-2">
          <ShieldCheck size={20} />
          Guard Panel
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <SidebarLink to="/guard/checkins" icon={<CalendarCheck size={18} />} label="Check-Ins" />
          <SidebarLink to="/guard/tables" icon={<ClipboardList size={18} />} label="Table Status" />
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white shadow flex items-center px-6 text-lg font-semibold text-gray-700">
          Guest Entry Management
        </header>

        <main className="flex-1 p-5 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-2 rounded-lg transition ${
        isActive ? "bg-emerald-600 text-white" : "hover:bg-slate-800"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default GuardLayout;
