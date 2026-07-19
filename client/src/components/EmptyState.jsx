import { Search, Package, Wallet, Activity } from "lucide-react";

const EmptyState = ({ type = "default", message, description }) => {
  const icons = {
    search: <Search className="h-16 w-16 text-muted-foreground" />,
    portfolio: <Package className="h-16 w-16 text-muted-foreground" />,
    wallet: <Wallet className="h-16 w-16 text-muted-foreground" />,
    orders: <Activity className="h-16 w-16 text-muted-foreground" />,
    default: <Package className="h-16 w-16 text-muted-foreground" />,
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-4">{icons[type]}</div>
      <h3 className="text-xl font-semibold mb-2">{message || "Nothing here yet"}</h3>
      <p className="text-muted-foreground text-center max-w-sm">
        {description || "Check back later for updates"}
      </p>
    </div>
  );
};

export default EmptyState;
