import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../api/client";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const fetchUser = async () => {
  const { data } = await apiClient.get("/users/me");
  return data.user;
};

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{isLoading ? <Skeleton className="h-6 w-24" /> : user?.username}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {isLoading ? <Skeleton className="h-4 w-40" /> : user?.email}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">User Type</span>
                <span className="font-medium">
                  {isLoading ? <Skeleton className="h-4 w-12" /> : user?.usertype}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Portfolio Value</span>
                <span className="font-medium">
                  {isLoading ? (
                    <Skeleton className="h-4 w-24" />
                  ) : (
                    `$${(user?.portfolio?.reduce((acc, item) => acc + (item.count * item.avgPrice), 0) || 0).toLocaleString()}`
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Stocks in Portfolio</span>
                <span className="font-medium">
                  {isLoading ? <Skeleton className="h-4 w-6" /> : user?.portfolio?.length || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="destructive" onClick={handleLogout} className="w-full">
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
