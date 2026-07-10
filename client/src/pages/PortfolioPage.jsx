import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#38bdf8', '#34d399', '#f59e0b', '#ef4444', '#a78bfa'];

export default function PortfolioPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/portfolio');
        setPortfolio(data.portfolio || []);
      } catch (err) {
        setError('Unable to load your portfolio right now.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const chartData = portfolio.map((item) => ({ name: item.symbol, value: item.quantity * item.currentPrice }));
  const totalValue = portfolio.reduce((sum, item) => sum + item.quantity * item.currentPrice, 0);
  const totalCost = portfolio.reduce((sum, item) => sum + item.quantity * item.averagePrice, 0);
  const totalReturn = totalValue - totalCost;
  const returnPercent = totalCost ? (totalReturn / totalCost) * 100 : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Portfolio</p>
        <h1 className="text-3xl font-semibold text-white">Your holdings</h1>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="glass p-5">
          <p className="text-sm text-slate-400">Cash Balance</p>
          <p className="mt-2 text-2xl font-semibold text-white">${Number(user?.virtualBalance || 100000).toLocaleString()}</p>
        </div>
        <div className="glass p-5">
          <p className="text-sm text-slate-400">Portfolio Value</p>
          <p className="mt-2 text-2xl font-semibold text-white">${totalValue.toFixed(2)}</p>
        </div>
        <div className="glass p-5">
          <p className="text-sm text-slate-400">Total Return</p>
          <p className={`mt-2 text-2xl font-semibold ${totalReturn >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>${totalReturn.toFixed(2)}</p>
        </div>
        <div className="glass p-5">
          <p className="text-sm text-slate-400">Return %</p>
          <p className={`mt-2 text-2xl font-semibold ${returnPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{returnPercent.toFixed(1)}%</p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="glass p-6">
          <h2 className="mb-4 text-xl font-semibold">Allocation</h2>
          {loading ? <div className="text-slate-400">Loading portfolio...</div> : error ? <div className="text-rose-400">{error}</div> : portfolio.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-slate-400">You have no holdings yet. Head to the market and place your first trade.</div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={90} label>
                    {chartData.map((entry, index) => (<Cell key={entry.name} fill={COLORS[index % COLORS.length]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className="glass overflow-hidden">
          {loading ? <div className="p-6 text-slate-400">Loading portfolio...</div> : error ? <div className="p-6 text-rose-400">{error}</div> : portfolio.length === 0 ? (
            <div className="p-6 text-slate-400">No holdings yet.</div>
          ) : (
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Avg Price</th>
                  <th className="px-4 py-3">Current Price</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((item) => (
                  <tr key={item._id} className="border-t border-white/10">
                    <td className="px-4 py-3 font-semibold text-white">{item.symbol}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">${Number(item.averagePrice).toFixed(2)}</td>
                    <td className="px-4 py-3">${Number(item.currentPrice).toFixed(2)}</td>
                    <td className="px-4 py-3">${(item.quantity * item.currentPrice).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Link to={`/stock/${item.symbol}`} className="text-cyan-400 hover:text-cyan-300">Trade</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
