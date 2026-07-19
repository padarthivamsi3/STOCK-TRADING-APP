import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Search, TrendingUp } from "lucide-react";

const TRENDING_STOCKS = ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN", "META", "GOOGL", "AMD"];

const fetchStocks = async (query) => {
  if (!query) return { result: [] };
  const { data } = await apiClient.get(`/stocks?search=${query}`);
  return data.stocks;
};

const fetchStockQuote = async (symbol) => {
  const { data } = await apiClient.get(`/stocks/${symbol}`);
  return data;
};

const StockCard = ({ symbol }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stockQuote", symbol],
    queryFn: () => fetchStockQuote(symbol),
    enabled: !!symbol,
  });

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm">Failed to load</p>
        </CardContent>
      </Card>
    );
  }

  const { quote, profile } = data;
  const change = quote.c - quote.pc;
  const changePercent = ((change / quote.pc) * 100).toFixed(2);
  const isPositive = change >= 0;

  return (
    <Link to={`/stocks/${symbol}`}>
      <Card className="overflow-hidden hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{symbol}</span>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              isPositive 
                ? "bg-green-900/30 text-green-400" 
                : "bg-red-900/30 text-red-400"
            }`}>
              {isPositive ? "+" : ""}{changePercent}%
            </span>
          </div>
          <h3 className="text-muted-foreground text-sm truncate">
            {profile?.name || symbol}
          </h3>
          <p className="text-2xl font-bold">
            ${quote.c.toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function StockSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stocks, isLoading, isError, refetch } = useQuery({
    queryKey: ["stocks", searchQuery],
    queryFn: () => fetchStocks(searchQuery),
    enabled: !!searchQuery,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      refetch();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Markets</h1>
        <p className="text-muted-foreground">Explore the market, discover trending stocks, and trade with real-time data.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
        <Input
          placeholder="Search for stocks (e.g., AAPL, TSLA)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {/* Trending Stocks Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Trending Stocks</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRENDING_STOCKS.map((symbol) => (
            <StockCard key={symbol} symbol={symbol} />
          ))}
        </div>
      </div>

      {/* Search Results Section */}
      {searchQuery && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Search Results</h2>
          
          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {isError && (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">Failed to load stocks. Please try again.</p>
                <Button variant="ghost" onClick={refetch} className="mt-2">
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}

          {!isLoading && !isError && stocks?.result?.length > 0 && (
            <div className="grid gap-3">
              {stocks.result.map((stock) => (
                <Link key={stock.symbol} to={`/stocks/${stock.symbol}`}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">{stock.symbol}</span>
                        <span className="text-sm text-muted-foreground">{stock.type}</span>
                      </div>
                      <p className="text-muted-foreground mt-1">{stock.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && !isError && stocks?.result?.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No stocks found for "{searchQuery}"</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
