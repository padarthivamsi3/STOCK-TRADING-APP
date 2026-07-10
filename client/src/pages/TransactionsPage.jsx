import { useEffect, useState } from 'react';
import api from '../services/api';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTransactions = async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/transactions', { params: { search: query } });
      setTransactions(data.transactions || []);
    } catch (err) {
      setError('Unable to load transactions right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions(search);
  }, [search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Transactions</p>
          <h1 className="text-3xl font-semibold text-white">Trade history</h1>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ticker" className="rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none" />
      </div>

      {loading ? <div className="text-slate-400">Loading transactions...</div> : error ? <div className="text-rose-400">{error}</div> : transactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-400">No trades found for this search yet.</div>
      ) : (
        <div className="glass overflow-hidden">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400">
              <tr>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-semibold text-white">{tx.symbol}</td>
                  <td className={`px-4 py-3 capitalize ${tx.buyOrSell === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>{tx.buyOrSell}</td>
                  <td className="px-4 py-3">${Number(tx.price).toFixed(2)}</td>
                  <td className="px-4 py-3">{tx.quantity}</td>
                  <td className="px-4 py-3">{new Date(tx.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
