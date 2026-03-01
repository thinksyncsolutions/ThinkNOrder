import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const ManagerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar role="MANAGER" title="Branch Manager" />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;