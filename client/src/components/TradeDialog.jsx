import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "../api/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TradeDialog = ({ open, onOpenChange, stock, type }) => {
  const [quantity, setQuantity] = useState("1");
  const [stockType, setStockType] = useState("NASDAQ");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ symbol, name, count, stockType, orderType }) => {
      const { data } = await apiClient.post(`/orders/${orderType.toLowerCase()}`, {
        symbol,
        name,
        count: Number(count),
        stockType,
      });
      return data;
    },
    onSuccess: () => {
      toast.success(`${type} order placed successfully!`);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onOpenChange(false);
      setQuantity("1");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Order failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity || Number(quantity) < 1) return;
    mutation.mutate({
      symbol: stock.symbol,
      name: stock.description || stock.symbol,
      count: quantity,
      stockType,
      orderType: type,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type} {stock.symbol}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Stock Type</Label>
            <Select value={stockType} onValueChange={setStockType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NASDAQ">NASDAQ</SelectItem>
                <SelectItem value="NYSE">NYSE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`flex-1 ${
                type === "Buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Processing..." : `${type} ${quantity} shares`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TradeDialog;
