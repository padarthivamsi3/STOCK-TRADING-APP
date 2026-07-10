import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { FiSearch, FiStar } from 'react-icons/fi';

export default function MarketPage() {
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [stocksRes, watchlistRes] = await Promise.allSettled([api.get('/stocks'), api.get('/watchlist')]);
      const fetchedStocks = stocksRes.status === 'fulfilled' ? stocksRes.value.data.stocks || [] : [];
      const fetchedWatchlist = watchlistRes.status === 'fulfilled' ? watchlistRes.value.data.watchlist || [] : [];
      setStocks(fetchedStocks);
      setWatchlist(fetchedWatchlist);
      if (stocksRes.status === 'rejected') {
        toast.error('Unable to load market data');
      }
    } catch (error) {
      toast.error('Unable to load market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleWatchlist = async (symbol) => {
    const inWatchlist = watchlist.some((item) => item.symbol === symbol);
    try {
      if (inWatchlist) {
        await api.delete(`/watchlist/${symbol}`);
        setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
        toast.info(`${symbol} removed from watchlist`);
      } else {
        await api.post('/watchlist', { symbol });
        setWatchlist((prev) => [...prev, { symbol }]);
        toast.success(`${symbol} added to watchlist`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Watchlist update failed');
    }
  };

  const filtered = stocks.filter((stock) => {
    const symbol = String(stock.symbol || '').toLowerCase();
    const companyName = String(stock.companyName || '').toLowerCase();
    const query = search.toLowerCase();
    return symbol.includes(query) || companyName.includes(query);
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Market</p>
          <h1 className="text-3xl font-semibold text-white">Explore the market</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 py-3">
          <FiSearch className="text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-56 bg-transparent outline-none" placeholder="Search stocks" />
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400">Loading market data...</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((stock) => {
            const inWatchlist = watchlist.some((item) => item.symbol === stock.symbol);
            return (
              <div key={stock.symbol} className="glass p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-xl font-semibold">{stock.symbol}</p>
                    <p className="text-sm text-slate-400">{stock.companyName}</p>
                  </div>
                  <button onClick={() => toggleWatchlist(stock.symbol)} className={`rounded-full p-2 ${inWatchlist ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-slate-300'}`}>
                    <FiStar />
                  </button>
                </div>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-semibold">${stock.price}</p>
                    <p className={`${Number(stock.change) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{stock.change}%</p>
                  </div>
                  <Link to={`/stock/${stock.symbol}`} className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold">View</Link>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="rounded-xl border border-white/10 bg-slate-800/60 p-3">Volume <span className="block text-white">{stock.volume}</span></div>
                  <div className="rounded-xl border border-white/10 bg-slate-800/60 p-3">Market Cap <span className="block text-white">${stock.marketCap}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
