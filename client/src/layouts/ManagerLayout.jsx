import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar"; // adjust path if needed

const ManagerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Shared Role-Based Sidebar */}
      <Sidebar role="MANAGER" title="Branch Manager" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Branch Operations
          </h2>
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

export default ManagerLayout;
