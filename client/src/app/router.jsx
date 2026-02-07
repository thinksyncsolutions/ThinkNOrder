import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// auth
import Login from "../pages/auth/login";

// superadmin
// import SuperAdminDashboard from "../superadmin/SuperAdminDashboard";
// import CreateRestaurant from "../superadmin/CreateRestaurant";

// owner
// import OwnerDashboard from "../owner/OwnerDashboard";
// import CreateBranch from "../owner/CreateBranch";

// staff
// import Orders from "../staff/Orders";
// import Tables from "../staff/Tables";
// import Kitchen from "../staff/Kitchen";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

//   {
//     path: "/superadmin",
//     element: (
//       <ProtectedRoute roles={["SUPERADMIN"]}>
//         <SuperAdminDashboard />
//       </ProtectedRoute>
//     )
//   },
//   {
//     path: "/superadmin/restaurants/create",
//     element: (
//       <ProtectedRoute roles={["SUPERADMIN"]}>
//         <CreateRestaurant />
//       </ProtectedRoute>
//     )
//   },

//   {
//     path: "/owner",
//     element: (
//       <ProtectedRoute roles={["OWNER"]}>
//         <OwnerDashboard />
//       </ProtectedRoute>
//     )
//   },
//   {
//     path: "/owner/branches/create",
//     element: (
//       <ProtectedRoute roles={["OWNER"]}>
//         <CreateBranch />
//       </ProtectedRoute>
//     )
//   },

//   {
//     path: "/staff/orders",
//     element: (
//       <ProtectedRoute roles={["WAITER", "CASHIER"]}>
//         <Orders />
//       </ProtectedRoute>
//     )
//   },
//   {
//     path: "/staff/tables",
//     element: (
//       <ProtectedRoute roles={["WAITER", "CASHIER"]}>
//         <Tables />
//       </ProtectedRoute>
//     )
//   },
//   {
//     path: "/staff/kitchen",
//     element: (
//       <ProtectedRoute roles={["KITCHEN"]}>
//         <Kitchen />
//       </ProtectedRoute>
//     )
//   },

  { path: "*", element: <h2>404 – Page not found</h2> }
]);
