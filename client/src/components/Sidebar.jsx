import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  FileText,
  Wallet as WalletIcon,
  History,
} from "lucide-react";
import { cn } from "../utils/cn";

const Sidebar = () => {
  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Markets",
      path: "/stocks",
      icon: TrendingUp,
    },
    {
      title: "Portfolio",
      path: "/portfolio",
      icon: Briefcase,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: FileText,
    },
    {
      title: "Wallet",
      path: "/wallet",
      icon: WalletIcon,
    },
    {
      title: "Transactions",
      path: "/transactions",
      icon: History,
    },
  ];

  return (
    <aside className="w-64 border-r bg-card min-h-screen hidden md:block">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;