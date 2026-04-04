import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../components/Unauthorized";

import Login from "../pages/auth/Login";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";

import CreateRestaurant from "../pages/superadmin/CreateRestaurant";
import Settings from "../pages/superadmin/Settings";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import BranchPage from "../pages/owner/BranchPage";
import StaffPage from "../pages/owner/StaffPage";

import ManagerDashboard from "../pages/manager/ManagerDashboard";
import Orders from "../pages/manager/Orders";
import Tables from "../pages/manager/Places";
import MenuManagement from "../pages/manager/MenuManagement";
import Staff from "../pages/manager/Staff";
import TableManagement from "../pages/manager/TableManagement";

import WaiterDashboard from "../pages/waiter/WaiterDashboard";

import CashierDashboard from "../pages/cashier/CashierDashboard";

import KitchenDashboard from "../pages/kitchen/KitchenDashboard";
import KitchenOrders from "../pages/kitchen/KitchenOrders";

import SelectBranchScreen from "../components/SelectBranchScreen"

import UserPage from "../pages/user/UserPage";

import RoleLayout from "../layouts/RoleLayout";
import SystemUsers from "../pages/superadmin/SystemUsers";
// import { Settings } from "lucide-react";

import ServerOffline from "../components/ServerOffline";

const host = window.location.hostname;
const isQRDomain = host === "qr.thinknorder.in";

export const router = createBrowserRouter(
  isQRDomain
    ? [
        {
          path: "/:placeCode",
          element: <UserPage />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ]
    : [
        { path: "/", element: <Login /> },

        {
          path: "/select-branch",
          element: (
            <ProtectedRoute>
              <SelectBranchScreen />
            </ProtectedRoute>
          ),
        },

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
            { path: "users", element: <SystemUsers /> },
            { path: "settings", element: <Settings /> },
          ],
        },

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

        {
          path: "/manager",
          element: (
            <ProtectedRoute roles={["MANAGER"]}>
              <RoleLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: "dashboard", element: <ManagerDashboard /> },
            { path: "orders", element: <Orders /> },
            { path: "tables", element: <Tables /> },
            { path: "menu", element: <MenuManagement /> },
            { path: "staff", element: <Staff /> },
            { path: "kitchen", element: <KitchenOrders /> },
            { path: "table/:Id", element: <TableManagement /> },
          ],
        },

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

        { path: "/server-error", element: <ServerOffline /> },
        { path: "*", element: <Unauthorized /> },
      ]
);

// export const router = createBrowserRouter([
//   { path: "/", element: <Login /> },
//   // { path: "/register", element: <RegisterOwner /> },

//   {
//   path: "/select-branch",
//   element: (
//     <ProtectedRoute>
//       <SelectBranchScreen />
//     </ProtectedRoute>
//   )
// },

//   // 🔴 SUPER ADMIN
//   {
//     path: "/superadmin",
//     element: (
//       <ProtectedRoute roles={["SUPERADMIN"]}>
//         <RoleLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <Navigate to="dashboard" replace /> },
//       { path: "dashboard", element: <SuperAdminDashboard /> },
//       { path: "restaurants", element: <CreateRestaurant /> },
//       { path: "users", element: <SystemUsers /> },
//       { path: "settings", element: <Settings /> },
//     ],
//   },

//   // 🟠 OWNER
//   {
//   path: "/owner",
//   element: (
//     <ProtectedRoute roles={["OWNER"]}>
//       <RoleLayout />
//     </ProtectedRoute>
//   ),
//   children: [
//     { index: true, element: <Navigate to="dashboard" replace /> },
//     { path: "dashboard", element: <OwnerDashboard /> },
//     { path: "branches", element: <BranchPage /> },
//     { path: "staff", element: <StaffPage /> },
//     // { path: "menu", element: <MenuManagement /> },
//   ],
// },
//   // 🟡 MANAGER
//   {
//     path: "/manager",
//     element: (
//       <ProtectedRoute roles={["MANAGER"]}>
//         <RoleLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <Navigate to="dashboard" replace /> }, // redirect
//       { path: "dashboard", element: <ManagerDashboard /> },
//       { path: "orders", element: <Orders /> },
//       { path: "tables", element: <Tables /> },
//       { path: "menu", element: <MenuManagement /> },
//       { path: "staff", element: <Staff /> },
//       {path: "kitchen", element: <KitchenOrders />},
//        { path: "table/:tableId", element: <TableManagement /> },
//     ],
//   },
//   // 🟢 WAITER
//   {
//     path: "/waiter",
//     element: (
//       <ProtectedRoute roles={["WAITER"]}>
//         <RoleLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <Navigate to="dashboard" replace /> },
//       { path: "dashboard", element: <WaiterDashboard /> },

//     ],
//   },
//   // 🔵 CASHIER
//   {
//     path: "/cashier",
//     element: (
//       <ProtectedRoute roles={["CASHIER"]}>
//         <RoleLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <Navigate to="dashboard" replace /> },
//       { path: "dashboard", element: <CashierDashboard /> },
//     ],
//   },
//   // 🟣 KITCHEN
//   {
//     path: "/kitchen",
//     element: (
//       <ProtectedRoute roles={["KITCHEN"]}>
//         <RoleLayout />

//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <Navigate to="dashboard" replace /> },
//       { path: "dashboard", element: <KitchenDashboard /> },
//       { path: "orders", element: <KitchenOrders /> },
//     ],
//   },

//   // user menu page
//   {
//     path: "/:placeCode",
//     element: (
//         <UserPage />
//     ),
//   },

//   { path: "*", element: <Unauthorized /> },
// ]);
