import {
  LayoutDashboard,
  Users,
  Settings,
  Store,
  ClipboardList,
  UtensilsCrossed,
  BarChart3,
} from "lucide-react";

export const SidebarConfig = {
  SUPERADMIN: [
    { to: "/superadmin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/superadmin/restaurants", label: "Restaurants", icon: <Users size={18} /> },
    { to: "/superadmin/users", label: "Users", icon: <Users size={18} /> },
    { to: "/superadmin/settings", label: "Settings", icon: <Settings size={18} /> },
  ],
  OWNER: [
    { to: "/owner/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/owner/branches", label: "Branches", icon: <Store size={18} /> },
    { to: "/owner/staff", label: "Staff", icon: <Users size={18} /> },
    { to: "/owner/menu", label: "Menu", icon: <ClipboardList size={18} /> },
    { to: "/owner/settings", label: "Settings", icon: <Settings size={18} /> },
  ],
  MANAGER: [
    { to: "/manager/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/manager/orders", label: "Bill", icon: <ClipboardList size={18} /> },
    { to: "/manager/menu", label: "Menu", icon: <ClipboardList size={18} /> },
    { to: "/manager/tables", label: "Tables", icon: <UtensilsCrossed size={18} /> },
    { to: "/manager/staff", label: "Staff", icon: <Users size={18} /> },
    { to: "/manager/kitchen", label: "Kitchen", icon: <BarChart3 size={18} /> },
  ],
  WAITER: [
    { to: "/waiter/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/waiter/orders", label: "Orders", icon: <ClipboardList size={18} /> },
    { to: "/waiter/tables", label: "Tables", icon: <UtensilsCrossed size={18} /> },
  ],
  CASHIER: [
    { to: "/cashier/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/cashier/orders", label: "Orders", icon: <ClipboardList size={18} /> },
    { to: "/cashier/payments", label: "Payments", icon: <Store size={18} /> },
  ],
  KITCHEN: [
    { to: "/kitchen/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/kitchen/orders", label: "LiveOrders", icon: <ClipboardList size={18} /> },
    // { to: "/kitchen/history", label: "History", icon: <BarChart3 size={18} /> },
  ],
};