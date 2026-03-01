import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import Navbar from "../components/common/Navbar";

const OwnerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar role="OWNER" title="Restaurant Owner" />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;