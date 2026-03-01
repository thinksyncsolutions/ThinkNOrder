import { createBrowserRouter, Navigate } from "react-router-dom";
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
import Tables from "../pages/manager/Places";
import MenuManagement from "../pages/manager/MenuManagement";
import Staff from "../pages/manager/Staff";
import TableManagement from "../pages/manager/TableManagement";

import WaiterLayout from "../layouts/WaiterLayout";
import WaiterDashboard from "../pages/waiter/WaiterDashboard";

import CashierLayout from "../layouts/CashierLayout";
import CashierDashboard from "../pages/cashier/CashierDashboard";

import KitchenLayout from "../layouts/KitchenLayout";
import KitchenDashboard from "../pages/kitchen/KitchenDashboard";
import KitchenOrders from "../pages/kitchen/KitchenOrders";

import SelectBranchScreen from "../components/SelectBranchScreen"

import UserPage from "../pages/user/UserPage";

import RoleLayout from "../layouts/RoleLayout";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  // { path: "/register", element: <RegisterOwner /> },

  {
  path: "/select-branch",
  element: (
    <ProtectedRoute>
      <SelectBranchScreen />
    </ProtectedRoute>
  )
},

  // 🔴 SUPER ADMIN
  {
    path: "/superadmin",
    element: (
      <ProtectedRoute roles={["SUPERADMIN"]}>
        <RoleLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <SuperAdminDashboard /> },
      { path: "restaurants", element: <CreateRestaurant /> },
    ],
  },

  // 🟠 OWNER
  {
  path: "/owner",
  element: (
    <ProtectedRoute roles={["OWNER"]}>
      <RoleLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: "dashboard", element: <OwnerDashboard /> },
    { path: "branches", element: <BranchPage /> },
    { path: "staff", element: <StaffPage /> },
  ],
},
  // 🟡 MANAGER
  {
    path: "/manager",
    element: (
      <ProtectedRoute roles={["MANAGER"]}>
        <RoleLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> }, // redirect
      { path: "dashboard", element: <ManagerDashboard /> },
      { path: "orders", element: <Orders /> },
      { path: "tables", element: <Tables /> },
      { path: "menu", element: <MenuManagement /> },
      { path: "staff", element: <Staff /> },
      {path: "kitchen", element: <KitchenOrders />},
       { path: "table/:id", element: <TableManagement /> },
    ],
  },
  // 🟢 WAITER
  {
    path: "/waiter",
    element: (
      <ProtectedRoute roles={["WAITER"]}>
        <RoleLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <WaiterDashboard /> },

    ],
  },
  // 🔵 CASHIER
  {
    path: "/cashier",
    element: (
      <ProtectedRoute roles={["CASHIER"]}>
        <RoleLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <CashierDashboard /> },
    ],
  },
  // 🟣 KITCHEN
  {
    path: "/kitchen",
    element: (
      <ProtectedRoute roles={["KITCHEN"]}>
        <RoleLayout />

      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <KitchenDashboard /> },
      { path: "orders", element: <KitchenOrders /> },
    ],
  },

  // user menu page
  {
    path: "/:restaurantId/:branchId/:placeId/:floor/:type/:number",
    element: (
        <UserPage />
    ),
  },

  { path: "*", element: <Unauthorized /> },
]);
