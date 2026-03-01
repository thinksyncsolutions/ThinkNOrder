import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/common/Navbar";

const RoleLayout = () => {
  const { user } = useSelector((state) => state.auth);

  // 🔐 If not logged in
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar auto role */}
      <Navbar role={user.role} title={`${user.role} Panel`} />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RoleLayout;