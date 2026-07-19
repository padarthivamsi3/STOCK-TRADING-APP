import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/client";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import EmptyState from "../components/EmptyState";

const fetchTransactions = async () => {
  const { data } = await apiClient.get("/transactions");
  return data.transactions;
};

export default function Transactions() {
  const { data: transactions, isLoading, isError, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          View your deposit and withdrawal history
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          )}
          {!isLoading && !isError && transactions?.length === 0 && (
            <EmptyState
              type="transactions"
              message="No transactions yet"
              description="Deposit or withdraw to see your transaction history"
            />
          )}
          {!isLoading && !isError && transactions?.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>
                      {new Date(transaction.time).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.type === "deposit" ? "success" : "destructive"}
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
