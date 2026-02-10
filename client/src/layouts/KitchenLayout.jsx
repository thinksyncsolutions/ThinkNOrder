import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ClipboardList, History, LogOut } from "lucide-react";

const KitchenLayout = () => {
  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div className="w-56 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-slate-800">
          Kitchen Panel
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <SidebarLink to="/kitchen" icon={<ClipboardList size={18} />} label="Dashboard" />
          <SidebarLink to="/kitchen/orders" icon={<ClipboardList size={18} />} label="Live Orders" />
          <SidebarLink to="/kitchen/history" icon={<History size={18} />} label="History" />
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-slate-950 border-b border-slate-800 flex items-center px-6 text-lg font-semibold">
          Kitchen Orders Board
        </header>

        <main className="flex-1 p-4 overflow-y-auto">
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
        isActive ? "bg-emerald-600" : "hover:bg-slate-800"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default KitchenLayout;
