import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const KitchenLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar role="KITCHEN" title="Kitchen Panel" />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default KitchenLayout;
