import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
// import RegisterOwner from "../pages/auth/RegisterOwner";

// import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import CreateRestaurant from "../pages/superadmin/CreateRestaurant";

// import OwnerDashboard from "../pages/owner/Dashboard";
// import CreateBranch from "../pages/owner/CreateBranch";

// import Orders from "../pages/staff/Orders";
// import Tables from "../pages/staff/Tables";
// import Kitchen from "../pages/staff/Kitchen";

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
      // { index: true, element: <SuperAdminDashboard /> },
      { path: "restaurants/create", element: <CreateRestaurant /> },
    ],
  },

  // 🟠 OWNER
  // {
  //   path: "/owner",
  //   element: (
  //     <ProtectedRoute roles={["OWNER"]}>
  //       <OwnerDashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/owner/branches/create",
  //   element: (
  //     <ProtectedRoute roles={["OWNER"]}>
  //       <CreateBranch />
  //     </ProtectedRoute>
  //   ),
  // },

  // // 🟡 STAFF
  // {
  //   path: "/staff/orders",
  //   element: (
  //     <ProtectedRoute roles={["WAITER", "CASHIER"]}>
  //       <Orders />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/staff/tables",
  //   element: (
  //     <ProtectedRoute roles={["WAITER", "CASHIER"]}>
  //       <Tables />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/staff/kitchen",
  //   element: (
  //     <ProtectedRoute roles={["KITCHEN"]}>
  //       <Kitchen />
  //     </ProtectedRoute>
  //   ),
  // },

  { path: "*", element: <h2>404 – Page not found</h2> },
]);
