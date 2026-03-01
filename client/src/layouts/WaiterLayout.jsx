import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import Navbar from "../components/common/Navbar";

const WaiterLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar role="WAITER" title="Waiter Panel" />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default WaiterLayout;