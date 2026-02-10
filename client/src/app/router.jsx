import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../components/Unauthorized";

import Login from "../pages/auth/Login";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import OwnerLayout from "../layouts/OwnerLayout";


import CreateRestaurant from "../pages/superadmin/CreateRestaurant";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import BranchPage from "../pages/owner/BranchPage";
import StaffPage from "../pages/owner/StaffPage";

import ManagerLayout from "../layouts/ManagerLayout";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";


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
    ],
  },
  
  { path: "*", element: <Unauthorized /> },
]);
