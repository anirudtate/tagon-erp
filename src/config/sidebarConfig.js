import {
  Banknote,
  Building2,
  LayoutDashboard,
  Users,
  Warehouse,
} from "lucide-react";

export const sidebarConfig = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    name: "Manage users",
    icon: Users,
    children: [
      { name: "Manage warehouse", icon: Warehouse },
      { name: "Purchase", icon: Banknote },
      { name: "Supplier", icon: Building2 },
      { name: "Manage orders", icon: Users },
      { name: "Manage warehouse", icon: Warehouse },
      { name: "Purchase", icon: Banknote },
      { name: "Supplier", icon: Building2 },
      { name: "Manage orders", icon: Users },
    ],
  },
  { name: "Manage orders", icon: Users },
  { name: "Manage warehouse", icon: Warehouse },
  { name: "Purchase", icon: Banknote },
  { name: "Supplier", icon: Building2 },
];
