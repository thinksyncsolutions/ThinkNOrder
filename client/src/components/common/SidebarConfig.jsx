// SidebarConfig.js
import { 
  LayoutDashboard, Users, Settings, Store, 
  ClipboardList, UtensilsCrossed, BarChart3, CreditCard, ChefHat 
} from "lucide-react";

export const SidebarConfig = {
  SUPERADMIN: [
    { to: "/superadmin/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/superadmin/restaurants", label: "Restaurants", icon: Store },
    { to: "/superadmin/users", label: "System Users", icon: Users },
    { to: "/superadmin/settings", label: "Settings", icon: Settings },
  ],
  OWNER: [
    { to: "/owner/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/owner/branches", label: "My Branches", icon: Store },
    { to: "/owner/staff", label: "Staff Management", icon: Users },
    // { to: "/owner/menu", label: "Menu Master", icon: ClipboardList },
  ],
  MANAGER: [
    { to: "/manager/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/manager/orders", label: "Live Bills", icon: CreditCard },
    { to: "/manager/tables", label: "Floor Plan", icon: UtensilsCrossed },
    { to: "/manager/staff", label: "Attendance", icon: Users },
    { to: "/manager/menu", label: "Menu Management", icon: ClipboardList },
    { to: "/manager/kitchen", label: "Kitchen Orders", icon: ChefHat },
  ],
  WAITER: [
    { to: "/waiter/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/waiter/orders", label: "Orders", icon: ClipboardList },
    { to: "/waiter/tables", label: "Tables", icon: UtensilsCrossed },
  ],
  CASHIER: [
    { to: "/cashier/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/cashier/orders", label: "Orders", icon: ClipboardList },
    { to: "/cashier/payments", label: "Payments", icon: Store },
  ],
  KITCHEN: [
    { to: "/kitchen/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/kitchen/orders", label: "LiveOrders", icon: ClipboardList },
    // { to: "/kitchen/history", label: "History", icon: BarChart3 },
  ],
};