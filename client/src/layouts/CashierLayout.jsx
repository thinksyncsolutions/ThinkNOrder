import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Receipt, CreditCard, History, LogOut } from "lucide-react";

const CashierLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-56 bg-slate-900 text-white flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-slate-800">
          Cashier Panel
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <SidebarLink to="/cashier/billing" icon={<Receipt size={18} />} label="Billing" />
          <SidebarLink to="/cashier/payments" icon={<CreditCard size={18} />} label="Payments" />
          <SidebarLink to="/cashier/history" icon={<History size={18} />} label="History" />
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
        <header className="h-14 bg-white shadow flex items-center px-6 text-lg font-semibold text-gray-700">
          Billing & Payments
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

export default CashierLayout;
