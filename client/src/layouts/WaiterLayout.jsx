import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Utensils, ClipboardList, History, LogOut } from "lucide-react";

const WaiterLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-56 bg-slate-900 text-white flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-slate-800">
          Waiter Panel
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <SidebarLink to="/waiter/tables" icon={<Utensils size={18} />} label="Tables" />
          <SidebarLink to="/waiter/orders" icon={<ClipboardList size={18} />} label="Orders" />
          <SidebarLink to="/waiter/history" icon={<History size={18} />} label="History" />
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
        <header className="h-14 bg-white shadow flex items-center px-6 text-lg font-semibold">
          Order Management
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

export default WaiterLayout;
