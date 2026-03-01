import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import Navbar from "../components/common/Navbar";

const SuperAdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar role="SUPERADMIN" title="Super Admin" />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayout;