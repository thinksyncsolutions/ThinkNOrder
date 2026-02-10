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
    { to: "/superadmin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/superadmin/restaurants", label: "Restaurants", icon: <Users size={18} /> },
    { to: "/superadmin/users", label: "Users", icon: <Users size={18} /> },
    { to: "/superadmin/settings", label: "Settings", icon: <Settings size={18} /> },
  ],
  OWNER: [
    { to: "/owner", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/owner/branches", label: "Branches", icon: <Store size={18} /> },
    { to: "/owner/staff", label: "Staff", icon: <Users size={18} /> },
    { to: "/owner/menu", label: "Menu", icon: <ClipboardList size={18} /> },
    { to: "/owner/settings", label: "Settings", icon: <Settings size={18} /> },
  ],
  MANAGER: [
    { to: "/manager", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/manager/orders", label: "Orders", icon: <ClipboardList size={18} /> },
    { to: "/manager/tables", label: "Tables", icon: <UtensilsCrossed size={18} /> },
    { to: "/manager/staff", label: "Staff", icon: <Users size={18} /> },
    { to: "/manager/reports", label: "Reports", icon: <BarChart3 size={18} /> },
  ],
  WAITER: [
    { to: "/waiter", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/waiter/orders", label: "Orders", icon: <ClipboardList size={18} /> },
    { to: "/waiter/tables", label: "Tables", icon: <UtensilsCrossed size={18} /> },
  ],
  CASHIER: [
    { to: "/cashier", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/cashier/orders", label: "Orders", icon: <ClipboardList size={18} /> },
    { to: "/cashier/payments", label: "Payments", icon: <Store size={18} /> },
  ],
  KITCHEN: [
    { to: "/kitchen", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/kitchen/orders", label: "Orders", icon: <ClipboardList size={18} /> },
  ],
};
