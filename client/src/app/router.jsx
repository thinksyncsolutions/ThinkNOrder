import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../components/Unauthorized";

import Login from "../pages/auth/Login";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";

import OwnerLayout from "../layouts/OwnerLayout";

import CreateRestaurant from "../pages/superadmin/CreateRestaurant";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import BranchPage from "../pages/owner/BranchPage";
import StaffPage from "../pages/owner/StaffPage";

import ManagerLayout from "../layouts/ManagerLayout";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import Orders from "../pages/manager/Orders";
import Tables from "../pages/manager/Tables";
import Menu from "../pages/manager/Menu";
import Staff from "../pages/manager/Staff";

import WaiterLayout from "../layouts/WaiterLayout";
import WaiterDashboard from "../pages/waiter/WaiterDashboard";

import CashierLayout from "../layouts/CashierLayout";
import CashierDashboard from "../pages/cashier/CashierDashboard";

import KitchenLayout from "../layouts/KitchenLayout";
import KitchenDashboard from "../pages/kitchen/KitchenDashboard";



export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  // { path: "/register", element: <RegisterOwner /> },

  // 🔴 SUPER ADMIN
  {
    path: "/superadmin",
    element: (
      <ProtectedRoute roles={["SUPERADMIN"]}>
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: "restaurants", element: <CreateRestaurant /> },
    ],
  },

  // 🟠 OWNER
  {
  path: "/owner",
  element: (
    <ProtectedRoute roles={["OWNER"]}>
      <OwnerLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <OwnerDashboard /> }, // <-- Dashboard shows here
    { path: "branches", element: <BranchPage /> },
    { path: "staff", element: <StaffPage /> },
  ],
},
  // 🟡 MANAGER
  {
    path: "/manager",
    element: (
      <ProtectedRoute roles={["MANAGER"]}>
        <ManagerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ManagerDashboard /> },
      { path: "orders", element: <Orders /> },
      { path: "tables", element: <Tables /> },
      { path: "menu", element: <Menu /> },
      { path: "staff", element: <Staff /> },
    ],
  },
  // 🟢 WAITER
  {
    path: "/waiter",
    element: (
      <ProtectedRoute roles={["WAITER"]}>
        <WaiterLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <WaiterDashboard /> },
    ],
  },
  // 🔵 CASHIER
  {
    path: "/cashier",
    element: (
      <ProtectedRoute roles={["CASHIER"]}>
        <CashierLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <CashierDashboard /> },
    ],
  },
  // 🟣 KITCHEN
  {
    path: "/kitchen",
    element: (
      <ProtectedRoute roles={["KITCHEN"]}>
        <KitchenLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <KitchenDashboard /> },
    ],
  },

  { path: "*", element: <Unauthorized /> },
]);
