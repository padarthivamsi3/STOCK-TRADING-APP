import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  TrendingUp,
  Bell,
  User,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="border-b bg-card/70 backdrop-blur-md sticky top-0 z-50">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">
              StockTrader
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Notification */}
            <Button
              variant="ghost"
              size="icon"
            >
              <Bell className="h-5 w-5" />
            </Button>

            {/* Profile */}
            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="" />

                    <AvatarFallback className="bg-primary text-white">
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <span className="hidden md:block font-medium">
                    Profile
                  </span>

                </Button>

              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-60"
              >

                <DropdownMenuLabel>

                  <div className="flex flex-col">

                    <span className="font-medium">
                      {user?.username}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>

                  </div>

                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/wallet")}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;