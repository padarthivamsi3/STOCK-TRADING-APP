import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FiArrowUpRight, FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', value: 120000 },
  { name: 'Feb', value: 126000 },
  { name: 'Mar', value: 132000 },
  { name: 'Apr', value: 128000 },
  { name: 'May', value: 145000 },
  { name: 'Jun', value: 154000 }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [portfolioRes, txRes, stocksRes] = await Promise.all([
        api.get('/portfolio'),
        api.get('/transactions?limit=5'),
        api.get('/stocks')
      ]);
      setPortfolio(portfolioRes.data.portfolio || []);
      setTransactions(txRes.data.transactions || []);
      setStocks(stocksRes.data.stocks || []);
    };
    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Dashboard</p>
          <h1 className="text-3xl font-semibold text-white">Welcome back, {user?.name || 'Trader'}.</h1>
          <p className="mt-2 text-slate-400">Track your virtual balance, portfolio, and market moves in one place.</p>
        </div>
        <Link to="/market" className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-white">Quick Buy</Link>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Virtual Balance', value: `$${user?.virtualBalance?.toLocaleString() || '100000'}`, icon: FiDollarSign, tone: 'from-cyan-500/20 to-cyan-400/10' },
          { label: 'Portfolio Value', value: '$154,230', icon: FiTrendingUp, tone: 'from-emerald-500/20 to-emerald-400/10' },
          { label: "Today's P/L", value: '+$2,340', icon: FiArrowUpRight, tone: 'from-violet-500/20 to-violet-400/10' },
          { label: 'Overall P/L', value: '+$14,230', icon: FiTrendingDown, tone: 'from-amber-500/20 to-amber-400/10' }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`glass rounded-2xl bg-gradient-to-br ${item.tone} p-6`}>
              <div className="mb-4 inline-flex rounded-full bg-white/10 p-3 text-white"><Icon /></div>
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="glass p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Portfolio Growth</h2>
            <p className="text-sm text-slate-400">6 months</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#38bdf8" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-6">
            <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx._id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/60 px-3 py-3">
                  <div>
                    <p className="font-medium">{tx.symbol}</p>
                    <p className="text-sm text-slate-400">{tx.buyOrSell.toUpperCase()} • {new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                  <p className={`font-semibold ${tx.buyOrSell === 'buy' ? 'text-rose-400' : 'text-emerald-400'}`}>{tx.buyOrSell === 'buy' ? '-' : '+'}${tx.price * tx.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-6">
            <h2 className="mb-4 text-xl font-semibold">Top Movers</h2>
            <div className="space-y-3">
              {stocks.slice(0, 4).map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/60 px-3 py-3">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-slate-400">{stock.companyName}</p>
                  </div>
                  <p className="text-emerald-400">{stock.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
