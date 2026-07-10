import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const history = [
  { name: 'Mon', price: 191 },
  { name: 'Tue', price: 193 },
  { name: 'Wed', price: 195 },
  { name: 'Thu', price: 197 },
  { name: 'Fri', price: 196 },
  { name: 'Sat', price: 198 }
];

export default function StockDetailPage() {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState('buy');
  const [loading, setLoading] = useState(false);
  const [loadingStock, setLoadingStock] = useState(true);

  const loadStock = async () => {
    setLoadingStock(true);
    try {
      const { data } = await api.get(`/stocks/${symbol}`);
      setStock(data.stock);
    } catch (error) {
      toast.error('Could not load that stock right now.');
    } finally {
      setLoadingStock(false);
    }
  };

  useEffect(() => {
    loadStock();
  }, [symbol]);

  const handleTrade = async (e) => {
    e.preventDefault();
    if (!stock) return;
    setLoading(true);
    try {
      const payload = { symbol: stock.symbol, companyName: stock.companyName, quantity: Number(quantity), price: stock.price };
      if (action === 'buy') {
        await api.post('/portfolio/buy', payload);
        toast.success(`Bought ${quantity} share(s) of ${stock.symbol}`);
      } else {
        await api.post('/portfolio/sell', payload);
        toast.success(`Sold ${quantity} share(s) of ${stock.symbol}`);
      }
      await loadStock();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Trade failed');
    } finally {
      setLoading(false);
    }
  };

  if (loadingStock || !stock) return <div className="min-h-screen flex items-center justify-center text-white">Loading stock details...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="glass p-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Stock Details</p>
            <h1 className="text-3xl font-semibold">{stock.companyName} ({stock.symbol})</h1>
          </div>
          <div className="rounded-2xl bg-slate-800/70 px-4 py-3">
            <p className="text-sm text-slate-400">Current Price</p>
            <p className="text-3xl font-semibold">${Number(stock.price || 0).toFixed(2)}</p>
            <p className={`text-sm ${Number(stock.change || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{Number(stock.change || 0).toFixed(2)}%</p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Volume', stock.volume],
            ['Market Cap', stock.marketCap],
            ['52W High', stock.high52],
            ['52W Low', stock.low52]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-lg font-semibold">{value ?? 'N/A'}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleTrade} className="glass mb-8 flex flex-col gap-3 p-6 md:flex-row md:items-center">
          <select value={action} onChange={(e) => setAction(e.target.value)} className="rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none">
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none" />
          <button disabled={loading} className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold">
            {loading ? 'Processing...' : action === 'buy' ? 'Buy Shares' : 'Sell Shares'}
          </button>
        </form>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#38bdf8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
