import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadWatchlist = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/watchlist');
      const items = data.watchlist || [];
      const enriched = await Promise.all(items.map(async (item) => {
        try {
          const { data: stockData } = await api.get(`/stocks/${item.symbol}`);
          return { ...item, companyName: stockData.stock?.companyName || 'Unknown Company', price: stockData.stock?.price, change: stockData.stock?.change };
        } catch {
          return { ...item, companyName: 'Unknown Company', price: null, change: null };
        }
      }));
      setWatchlist(enriched);
    } catch (err) {
      setError('Unable to load your watchlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const addSymbol = async (e) => {
    e.preventDefault();
    if (!symbol.trim()) return;
    try {
      await api.post('/watchlist', { symbol: symbol.toUpperCase() });
      setSymbol('');
      await loadWatchlist();
      toast.success('Added to watchlist');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to add watchlist item');
    }
  };

  const removeSymbol = async (itemSymbol) => {
    try {
      await api.delete(`/watchlist/${itemSymbol}`);
      await loadWatchlist();
      toast.info(`${itemSymbol} removed`);
    } catch (error) {
      toast.error('Unable to remove watchlist item');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Watchlist</p>
        <h1 className="text-3xl font-semibold text-white">Your tracked stocks</h1>
      </div>

      <form onSubmit={addSymbol} className="glass mb-8 flex flex-col gap-3 p-6 md:flex-row">
        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} className="flex-1 rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none" placeholder="Add ticker such as AAPL" />
        <button className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold">Add to Watchlist</button>
      </form>

      {loading ? <div className="text-slate-400">Loading watchlist...</div> : error ? <div className="text-rose-400">{error}</div> : watchlist.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-400">Your watchlist is empty. Add a ticker to start tracking it.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {watchlist.map((item) => (
            <div key={item._id} className="glass p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xl font-semibold">{item.symbol}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.companyName}</p>
                  <p className="mt-3 text-lg font-semibold text-white">${Number(item.price || 0).toFixed(2)}</p>
                  <p className={`text-sm ${Number(item.change || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{Number(item.change || 0).toFixed(2)}%</p>
                </div>
                <button onClick={() => removeSymbol(item.symbol)} className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-300">Remove</button>
              </div>
              <div className="mt-5 flex gap-2">
                <Link to={`/stock/${item.symbol}`} className="rounded-full bg-cyan-500 px-3 py-2 text-sm font-semibold text-white">View</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
