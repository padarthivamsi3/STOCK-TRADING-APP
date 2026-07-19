import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/client";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Separator } from "../components/ui/separator";
import TradeDialog from "../components/TradeDialog";
import StockChart from "../features/stocks/components/StockChart";
import { ArrowUp, ArrowDown } from "lucide-react";

const fetchStockDetails = async (symbol) => {
  const { data } = await apiClient.get(`/stocks/${symbol}`);
  return data;
};

export default function StockDetails() {
  const { symbol } = useParams();
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [sellDialogOpen, setSellDialogOpen] = useState(false);

  const { data: stockData, isLoading, isError, refetch } = useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => fetchStockDetails(symbol),
  });

  const quote = stockData?.quote;
  const profile = stockData?.profile;
  const change = quote ? quote.c - quote.pc : 0;
  const changePercent = quote ? ((change / quote.pc) * 100) : 0;

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {isError && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-2">Failed to load stock details</p>
            <Button variant="ghost" onClick={refetch}>
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && (
        <>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {symbol}
                {profile?.name && <span className="text-muted-foreground ml-2">- {profile.name}</span>}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">${quote?.c?.toFixed(2) || "0.00"}</span>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  {change >= 0 ? "+" : ""}
                  {change?.toFixed(2)} ({changePercent?.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setBuyDialogOpen(true)}
              >
                Buy
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => setSellDialogOpen(true)}
              >
                Sell
              </Button>
            </div>
          </div>

          {/* Stock Chart */}
          <StockChart symbol={symbol} quote={quote} />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Previous Close
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${quote?.pc?.toFixed(2) || "0.00"}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Open Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${quote?.o?.toFixed(2) || "0.00"}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  High
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${quote?.h?.toFixed(2) || "0.00"}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Low
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${quote?.l?.toFixed(2) || "0.00"}</div>
              </CardContent>
            </Card>
          </div>

          {profile && (
            <>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.country && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p className="font-medium">{profile.country}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Currency</p>
                        <p className="font-medium">{profile.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Exchange</p>
                        <p className="font-medium">{profile.exchange}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Market Cap</p>
                        <p className="font-medium">
                          ${(profile.marketCapitalization / 1000000000).toFixed(2)}B
                        </p>
                      </div>
                    </div>
                  )}
                  {profile.weburl && (
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a
                        href={profile.weburl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {profile.weburl}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          <TradeDialog
            open={buyDialogOpen}
            onOpenChange={setBuyDialogOpen}
            stock={{ symbol, description: profile?.name }}
            type="Buy"
          />
          <TradeDialog
            open={sellDialogOpen}
            onOpenChange={setSellDialogOpen}
            stock={{ symbol, description: profile?.name }}
            type="Sell"
          />
        </>
      )}
    </div>
  );
}
