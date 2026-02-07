import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, Settings, LogOut } from "lucide-react";

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-slate-900 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {sidebarOpen && <h1 className="text-lg font-bold">Super Admin</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <SidebarLink to="/superadmin/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" open={sidebarOpen} />
          <SidebarLink to="/superadmin/users" icon={<Users size={18} />} label="Users" open={sidebarOpen} />
          <SidebarLink to="/superadmin/settings" icon={<Settings size={18} />} label="Settings" open={sidebarOpen} />
        </nav>

        <div className="p-3 border-t border-slate-700">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800">
            <LogOut size={18} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-700">Super Admin Panel</h2>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold">
              SA
            </div>
          </div>
        </header>

        {/* Content */}
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

export default SuperAdminLayout;
